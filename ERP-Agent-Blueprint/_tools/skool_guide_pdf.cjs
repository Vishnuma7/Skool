// usage: node skool_guide_pdf.cjs in.html out.pdf   (run from ERP-Agent-Blueprint/_video so playwright-core resolves)
const path = require('path');
const {chromium} = require(path.resolve('node_modules/playwright-core'));
(async () => {
  const b = await chromium.launch({executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true});
  const p = await b.newPage();
  await p.goto('file://' + path.resolve(process.argv[2]));
  await p.pdf({path: process.argv[3], format: 'A4', printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<div></div>',
    footerTemplate: '<div style="font-size:8px;color:#4C9484;width:100%;text-align:center;font-family:Helvetica">Skool Classroom Setup Guide · page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'});
  await b.close();
})();
