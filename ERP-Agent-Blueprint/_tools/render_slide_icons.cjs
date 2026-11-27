// Renders Lucide icons (4 colours) and the course logos to PNG for build_slides.py.
// usage (from ERP-Agent-Blueprint/_video): node ../_tools/render_slide_icons.cjs ../_tools/slide_assets/icons
const path=require('path');const fs=require('fs');
const R=require(path.resolve('node_modules/react'));const S=require(path.resolve('node_modules/react-dom/server'));
const L=require(path.resolve('node_modules/lucide-react'));const {chromium}=require(path.resolve('node_modules/playwright-core'));
const OUT=process.argv[2];
const names=['MessageSquare','ListOrdered','Bot','Brain','ClipboardList','Wrench','NotebookPen','UserCheck','Database','Mail','Clock','CloudRain','Coins','CalendarDays','FileSpreadsheet','CircleCheck','CircleX','Archive','FolderOpen','Tag','Upload','FlaskConical','ShieldCheck','History','PackageSearch','TriangleAlert','ArrowRight','Sparkles','Timer','Building2','MapPin','Lightbulb','Target','Play','BookOpen','Layers','Search','Truck','ShoppingCart','Users','Repeat','PlayCircle','FileText','HelpCircle','Compass','PencilLine','MessagesSquare','Download','Gauge','Lock','Link2','Rocket','Coffee','Hand','Warehouse','Settings','Boxes','ArrowDownToLine','ArrowUpFromLine','KeyRound','Route',
'ConciergeBell','Receipt','Globe','Send','ChefHat','Braces','IdCard','Merge','Eye','Cloud','Ban','Filter','Trophy','Eraser','Utensils','Wind','Banknote','Table','Rows3','Columns3','LayoutGrid','CircleHelp','CalendarCheck','Unlink','Sheet','Ruler','Paintbrush','Copy','Scale','Megaphone'];
const colors={w:'#FFFFFF',g:'#305C54',m:'#44D4B4',r:'#C0392B'};
(async()=>{const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const p=await b.newPage({viewport:{width:256,height:256}});
for(const n of names){const C=L[n];if(!C){console.log('missing',n);continue;}
 for(const [k,c] of Object.entries(colors)){const svg=S.renderToStaticMarkup(R.createElement(C,{size:256,color:c,strokeWidth:2}));
  await p.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
  await p.screenshot({path:`${OUT}/${n}_${k}.png`,omitBackground:true,clip:{x:0,y:0,width:256,height:256}});}}
for(const f of fs.readdirSync('public/logos')){const svg=fs.readFileSync('public/logos/'+f,'utf8');await p.setViewportSize({width:600,height:600});
 await p.setContent(`<html><body style="margin:0;background:transparent;display:flex;align-items:center;justify-content:center;width:600px;height:600px"><div style="width:560px;height:560px;display:flex;align-items:center;justify-content:center">${svg.replace('<svg','<svg style="max-width:560px;max-height:560px;width:560px;height:auto"')}</div></body></html>`);
 const el=await p.$('svg');await el.screenshot({path:`${OUT}/logo_${f.replace('.svg','')}.png`,omitBackground:true});}
await b.close();})();
