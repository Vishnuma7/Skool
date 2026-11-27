// usage: npx tsx capture/inspect.ts <hostMatch> "<js expression string>"
import {connect} from './cdp';
(async () => {
  const [host, js] = process.argv.slice(2);
  const b = await connect();
  try {
    const p = b.contexts()[0].pages().find((x) => x.url().includes(host))!;
    console.log(JSON.stringify(await p.evaluate(js), null, 1).slice(0, 4000));
  } finally { await b.close(); }
})();
