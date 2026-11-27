import {chromium, Browser, Page} from 'playwright-core';
export const connect = async (): Promise<Browser> => chromium.connectOverCDP('http://127.0.0.1:9333');
export const pageFor = async (b: Browser, host: string): Promise<Page> => {
  for (const c of b.contexts()) for (const p of c.pages()) if (p.url().includes(host)) return p;
  const p = await b.contexts()[0].newPage();
  return p;
};
/** Call n8n's internal REST API using the logged-in browser session. */
export const n8n = async (page: Page, method: string, path: string, body?: unknown) =>
  page.evaluate(async ({method, path, body}) => {
    const bid = localStorage.getItem('n8n-browserId') ?? '';
    const r = await fetch(`/rest${path}`, {
      method, credentials: 'include',
      headers: {'content-type': 'application/json', 'browser-id': bid},
      body: body ? JSON.stringify(body) : undefined,
    });
    const t = await r.text();
    try { return {status: r.status, json: JSON.parse(t)}; } catch { return {status: r.status, text: t.slice(0, 400)}; }
  }, {method, path, body});
