import fs from 'fs';
import {execFileSync} from 'child_process';
import {CDPSession, Page} from 'playwright-core';
/** CDP screencast recorder -> mp4 (30fps CFR) + event log (times in s from start). */
export class Rec {
  frames: {file: string; t: number}[] = [];
  events: {t: number; type: string; label?: string; x?: number; y?: number; rect?: any}[] = [];
  t0 = 0; dir: string; s!: CDPSession; n = 0; handler: any;
  constructor(public page: Page, public name: string) {
    this.dir = `work/rec/${name}`;
    fs.rmSync(this.dir, {recursive: true, force: true}); fs.mkdirSync(this.dir, {recursive: true});
  }
  now() { return Date.now() / 1000 - this.t0; }
  async start(s: CDPSession) {
    this.s = s;
    this.handler = async (e: any) => {
      const file = `${this.dir}/f${String(this.n++).padStart(5, '0')}.jpg`;
      fs.writeFileSync(file, Buffer.from(e.data, 'base64'));
      this.frames.push({file, t: e.metadata.timestamp});
      try { await s.send('Page.screencastFrameAck', {sessionId: e.sessionId}); } catch {}
    };
    s.on('Page.screencastFrame', this.handler);
    await s.send('Page.startScreencast', {format: 'jpeg', quality: 92, maxWidth: 3840, maxHeight: 2160, everyNthFrame: 1});
    this.t0 = Date.now() / 1000;
  }
  mark(type: string, extra: any = {}) { this.events.push({t: this.now(), type, ...extra}); }
  async stop(out: string) {
    const tEnd = Date.now() / 1000;
    await this.s.send('Page.stopScreencast'); this.s.off('Page.screencastFrame', this.handler);
    const f = this.frames;
    const base = f[0].t;
    const lines: string[] = [];
    for (let i = 0; i < f.length; i++) {
      const d = (i + 1 < f.length ? f[i + 1].t : tEnd) - f[i].t;
      lines.push(`file '${process.cwd()}/${f[i].file}'`, `duration ${Math.max(d, 0.001).toFixed(4)}`);
    }
    lines.push(`file '${process.cwd()}/${f[f.length - 1].file}'`);
    fs.writeFileSync(`${this.dir}/list.txt`, lines.join('\n'));
    execFileSync('bin/ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', `${this.dir}/list.txt`, '-vf', 'fps=30,scale=3840:2160:flags=lanczos,format=yuv420p',
      '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', '-movflags', '+faststart', out]);
    // shift event times so they are relative to the first video frame
    const off = base - this.t0;
    const ev = this.events.map((e) => ({...e, t: +(e.t - off).toFixed(3)}));
    fs.writeFileSync(out.replace(/\.mp4$/, '.json'), JSON.stringify({duration: +(tEnd - base).toFixed(3), events: ev}, null, 1));
    console.log('rec', out, f.length, 'frames', (tEnd - base).toFixed(1) + 's');
  }
}
