// Tira-Dúvidas Censo Agro: modo offline
const CACHE="tira-duvidas-v3.2";
const FILES=["./","index.html","manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("message",e=>{ if(e.data==="skip") self.skipWaiting(); });
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin) return;
  const isPage=e.request.mode==="navigate";
  if(isPage){ e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("index.html",c));return r}).catch(()=>caches.match("index.html"))); return; }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
