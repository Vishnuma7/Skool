import {open, peek} from './v06_util';
(async () => { const {p} = await open(); console.log(p.url()); await peek(p, 'now'); process.exit(0); })();
