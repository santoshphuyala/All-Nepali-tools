/* Offline cache: pages and CDN libraries are cached after the first online visit. Bump V when you change any tool file. */
const V='np-v9';
const PAGES=['./','index.html','Nepali_Font_Converter_v4.html','rupees-in-words.html','Trip_Expense_Splitter.html','Kharcha_Tracker.html','Bills_Renewals_Tracker.html','MedBox.html','vehicle-tracker.html','To-Do%20Manager.html','Engineering%20Unit%20Converter.html','final%20Nepali%20Calendar%20(BS_AD).html','FD_Manager_Nepal.html','Agreement%20Renewal%20Tracker.html','Insurance%20Policy%20Reminder.html','manifest.webmanifest'];
const LIBS=['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js','https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all([...PAGES.map(u=>c.add(u).catch(()=>{})),...LIBS.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{}))])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const ext=u.origin!==location.origin;
 if(ext&&!/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(u.host))return;
 e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>hit);
  return ext?(hit||net):(hit?(net,hit):net)}))});
