/** About video thumbnail (1920×1080), in the course banner's style: navy headline left, blue diagonal right, presenter cut-out. */
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, INTER} from '../theme';

const PH = 990; // presenter height on canvas
const PW = PH * (1158 / 1000);

export const Thumb: React.FC = () => (
  <AbsoluteFill style={{fontFamily: INTER, background: 'linear-gradient(160deg, #F8FAFF 0%, #EAF0FB 60%, #DCE6F8 100%)', overflow: 'hidden'}}>
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(15,23,42,0.07) 2px, transparent 2px)', backgroundSize: '40px 40px'}} />
    <AbsoluteFill style={{clipPath: 'polygon(66% 0, 69% 0, 51% 100%, 48% 100%)', background: 'rgba(37,99,235,0.16)'}} />
    <AbsoluteFill style={{clipPath: 'polygon(71% 0, 100% 0, 100% 100%, 54% 100%)', background: 'linear-gradient(160deg, #2563EB 0%, #1E3A8A 100%)'}} />
    {/* soft glow behind the head so the cut-out pops off the blue */}
    <div style={{position: 'absolute', left: 1250, top: 60, width: 720, height: 720, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(147,197,253,0.55) 0%, rgba(147,197,253,0) 65%)'}} />
    <Img src={staticFile('about_assets/presenter_cutout.png')}
      style={{position: 'absolute', left: 1610 - PW * 0.5, top: 1080 - PH + 20, width: PW, height: PH,
        filter: 'drop-shadow(0 24px 50px rgba(2,6,23,0.45))'}} />

    <div style={{position: 'absolute', left: 90, top: 70, color: C.navyDeep}}>
      <div style={{fontSize: 52, fontWeight: 900, letterSpacing: -1}}>AGENTIC SCM</div>
      <div style={{display: 'inline-block', marginTop: 22, background: '#1D4ED8', color: C.white, fontSize: 46, fontWeight: 800, fontStyle: 'italic',
        padding: '10px 34px', transform: 'skewX(-12deg)', boxShadow: '0 12px 30px rgba(29,78,216,0.35)'}}>
        <div style={{transform: 'skewX(12deg)'}}>AI AGENTS FOR SCM</div>
      </div>
      <div style={{marginTop: 34, fontSize: 132, fontWeight: 900, lineHeight: 0.98, letterSpacing: -4, textTransform: 'uppercase'}}>
        <div>Build AI</div>
        <div>agents for</div>
        <div style={{color: '#1D4ED8'}}>your supply</div>
        <div style={{color: '#1D4ED8'}}>chain.</div>
      </div>
      <div style={{marginTop: 34, display: 'flex', alignItems: 'center', gap: 20, fontSize: 40, fontWeight: 800}}>
        <span style={{background: C.green, color: C.white, padding: '10px 24px', borderRadius: 14}}>NO CODE</span>
        <span style={{color: C.navy}}>Procurement • Inventory • Planning</span>
      </div>
    </div>
  </AbsoluteFill>
);
