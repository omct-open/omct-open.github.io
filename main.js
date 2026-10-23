(function(){
  // ---------- Datos ----------
  const SOURCES = [
    {org:"Servicio Sismológico Nacional (SSN)",inst:"UNAM",d:"Sismología",what:"Catálogo de sismos, reportes especiales y datos de estaciones.",lic:"Uso libre con cita al SSN según sus términos",st:"pend"},
    {org:"Servicio Meteorológico Nacional (SMN)",inst:"CONAGUA",d:"Meteorología",what:"Normales climatológicas, datos de estaciones, pronósticos e imágenes de satélite.",lic:"Probablemente Libre Uso MX",st:"pend"},
    {org:"INEGI",inst:"Gobierno de México",d:"Geografía",what:"Continuo de elevaciones, cartas edafológicas, geológicas y de uso de suelo.",lic:"Términos de Libre Uso de la Información del INEGI",st:"ok"},
    {org:"Servicio Geológico Mexicano (SGM)",inst:"Gobierno de México",d:"Geología",what:"Cartografía geológica, geoquímica y magnetometría (GeoInfoMex).",lic:"Uso libre con atribución, por confirmar",st:"pend"},
    {org:"CONABIO Geoportal",inst:"Gobierno de México",d:"Ambiente",what:"Capas de biodiversidad, vegetación, ecorregiones y cuencas.",lic:"Varía por capa",st:"pend"},
    {org:"datos.gob.mx",inst:"Gobierno de México",d:"Varias",what:"Portal federal de datos abiertos con conjuntos de varias dependencias.",lic:"Libre Uso MX",st:"ok"},
    {org:"NASA Earthdata",inst:"NASA (EE. UU.)",d:"Teledetección",what:"MODIS, Landsat, ECOSTRESS, GPM y otros productos satelitales.",lic:"Sin derechos de autor en general; se pide atribución",st:"ok"},
    {org:"NOAA NCEI",inst:"NOAA (EE. UU.)",d:"Oceanografía",what:"Temperatura del mar, batimetría, registros climáticos y huracanes.",lic:"Dominio público (gobierno de EE. UU.) en general",st:"ok"},
    {org:"Copernicus Data Space",inst:"Unión Europea / ESA",d:"Teledetección",what:"Imágenes Sentinel-1, -2, -3 y -5P, y productos de atmósfera.",lic:"Acceso libre y abierto con atribución obligatoria",st:"ok"}
  ];
  const DISC = ["Todas",...Array.from(new Set(SOURCES.map(s=>s.d)))];

  const NEWS = [
    {type:"Tutorial",cls:"teal",title:"Islas de calor en Monterrey con ECOSTRESS",text:"Descarga y mapea la temperatura de superficie del área metropolitana.",credit:"Ilustración de maqueta",pal:"heat"},
    {type:"Infografía",cls:"blue",title:"Cómo se localiza un sismo",text:"Ondas P y S, estaciones y triangulación, explicadas en una sola lámina.",credit:"Ilustración de maqueta",pal:"seis"},
    {type:"Producto",cls:"ochre",title:"Atlas de fallas activas del Eje Neovolcánico",text:"Base de datos con DOI, metodología y capas descargables.",credit:"Ilustración de maqueta",pal:"geo"}
  ];
  const TUTS = [
    {r:["estudiante","docente"],type:"Infografía",cls:"blue",title:"Cómo se localiza un sismo",text:"Del sismograma al epicentro, paso a paso.",lvl:"Básico",pal:"seis"},
    {r:["estudiante","investigador"],type:"Tutorial",cls:"teal",title:"Catálogo del SSN en Python",text:"Descarga, limpia y grafica la sismicidad de un estado.",lvl:"Intermedio",pal:"seis"},
    {r:["investigador"],type:"Tutorial",cls:"teal",title:"Islas de calor con ECOSTRESS",text:"Temperatura de superficie sobre Monterrey con datos de NASA.",lvl:"Avanzado",pal:"heat"},
    {r:["estudiante","docente"],type:"Guía",cls:"ochre",title:"Leer una carta geológica del SGM",text:"Simbología, unidades litológicas y estructuras.",lvl:"Básico",pal:"geo"},
    {r:["docente"],type:"Material didáctico",cls:"blue",title:"Huracanes en el Pacífico mexicano",text:"Secuencia de clase con datos de NOAA y actividades.",lvl:"Básico",pal:"ocean"},
    {r:["investigador","estudiante"],type:"Tutorial",cls:"teal",title:"Perfiles topográficos con el CEM del INEGI",text:"Del modelo de elevación a un perfil en QGIS.",lvl:"Intermedio",pal:"geo"}
  ];
  const PRODS = [
    {type:"Base de datos",cls:"ochre",title:"Atlas de fallas activas del Eje Neovolcánico",text:"Capas vectoriales con atributos de cinemática y fuente bibliográfica.",lic:"CC BY 4.0",pal:"geo"},
    {type:"Informe",cls:"blue",title:"Sismicidad de México: balance anual",text:"Análisis del catálogo del SSN con gráficas y mapas reproducibles.",lic:"CC BY 4.0",pal:"seis"},
    {type:"Capa geográfica",cls:"teal",title:"Temperatura superficial urbana 2026",text:"Mosaicos de las principales zonas metropolitanas del país.",lic:"CC BY 4.0",pal:"heat"}
  ];

  // ---------- Ilustraciones generativas (sin imágenes de terceros) ----------
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  function field(x,y,t,seed){
    return Math.sin(x*1.3+seed+t)*Math.cos(y*1.1-seed*.7)+.6*Math.sin((x+y)*0.8+seed*2-t*.6)+.35*Math.cos(x*2.3-y*1.7+seed);
  }
  function contours(ctx,w,h,t,seed,levels,colorFn,step){
    const cols=Math.ceil(w/step)+1, rows=Math.ceil(h/step)+1, sc=3.2/Math.max(w,h);
    const v=new Float32Array(cols*rows);
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)v[j*cols+i]=field(i*step*sc*3,j*step*sc*3,t,seed);
    levels.forEach((L,li)=>{
      ctx.strokeStyle=colorFn(li);ctx.beginPath();
      for(let j=0;j<rows-1;j++)for(let i=0;i<cols-1;i++){
        const a=v[j*cols+i],b=v[j*cols+i+1],c=v[(j+1)*cols+i+1],d=v[(j+1)*cols+i];
        const k=(a>L?8:0)|(b>L?4:0)|(c>L?2:0)|(d>L?1:0); if(k===0||k===15)continue;
        const x=i*step,y=j*step,lerp=(p,q)=>(L-p)/(q-p);
        const T=[x+step*lerp(a,b),y],R=[x+step,y+step*lerp(b,c)],B=[x+step*lerp(d,c),y+step],Lf=[x,y+step*lerp(a,d)];
        const seg={1:[Lf,B],2:[B,R],3:[Lf,R],4:[T,R],5:[Lf,T,B,R],6:[T,B],7:[Lf,T],8:[Lf,T],9:[T,B],10:[T,R,Lf,B],11:[T,R],12:[Lf,R],13:[B,R],14:[Lf,B]}[k];
        for(let s=0;s<seg.length;s+=2){ctx.moveTo(seg[s][0],seg[s][1]);ctx.lineTo(seg[s+1][0],seg[s+1][1]);}
      }
      ctx.stroke();
    });
  }
  const PAL={
    heat:["#2B3A8C","#4167BC","#40ADB8","#E8C25A","#C16210","#A54402"],
    seis:["#0C193A","#4167BC","#6E8FD6","#A9BDEB"],
    geo:["#A54402","#C16210","#E0A060","#41B79D","#4167BC"],
    ocean:["#0C193A","#4167BC","#40ADB8","#41B79D"]
  };
  function drawFig(cv,pal,seed){
    const r=cv.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);
    const w=Math.max(1,r.width),h=Math.max(1,r.height);cv.width=w*dpr;cv.height=h*dpr;
    const ctx=cv.getContext("2d");ctx.scale(dpr,dpr);
    const P=PAL[pal];
    // relleno por bandas
    const step=6,sc=3.2/Math.max(w,h);
    for(let y=0;y<h;y+=step)for(let x=0;x<w;x+=step){
      const f=(field(x*sc*3,y*sc*3,0,seed)+2)/4;const idx=Math.min(P.length-1,Math.max(0,Math.floor(f*P.length)));
      ctx.fillStyle=P[idx];ctx.fillRect(x,y,step,step);
    }
    ctx.lineWidth=.8;contours(ctx,w,h,0,seed,[-1,-.5,0,.5,1],()=> "rgba(255,255,255,.45)",8);
  }
  function cardHTML(o,extra){
    return `<article class="card"><div class="fig"><canvas data-pal="${o.pal}" aria-hidden="true"></canvas><span class="credit">${o.credit||"Ilustración de maqueta"}</span></div>
    <div class="body"><div class="meta"><span class="pill ${o.cls}">${o.type}</span>${extra||""}</div><h3>${o.title}</h3><p>${o.text}</p></div></article>`;
  }
  function paintFigs(root){root.querySelectorAll(".fig canvas").forEach((c,i)=>drawFig(c,c.dataset.pal,1.7+i*1.3));}


  const $=id=>document.getElementById(id);
  // Novedades
  const news=$("newsCards");
  if(news){news.innerHTML=NEWS.map(o=>cardHTML(o)).join("");}
  // Productos
  const prod=$("prodCards");
  if(prod){prod.innerHTML=PRODS.map(o=>cardHTML(o,`<span class="pill line">${o.lic}</span>`).replace('</p></div></article>',`</p><p style="font-size:.85rem;color:var(--ink)">Autoría: Nombre Apellido</p><p class="mono" style="font-size:.78rem">DOI 10.5281/zenodo.XXXXXXX</p></div></article>`)).join("");}
  // Tutoriales
  const tut=$("tutCards");
  function renderTuts(r){
    if(!tut)return;
    const list=TUTS.filter(t=>r==="todas"||t.r.includes(r));
    tut.innerHTML=list.map(o=>cardHTML(o,`<span class="pill line">${o.lvl}</span>`)).join("");
    paintFigs(tut);
  }
  document.querySelectorAll("#routes .route").forEach(b=>b.addEventListener("click",()=>{
    document.querySelectorAll("#routes .route").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
    renderTuts(b.dataset.r);
  }));
  renderTuts("todas");

  // Fuentes
  const chips=$("chips"),q=$("q"),body=$("srcBody");
  if(chips&&q&&body){
    let disc="Todas";
    chips.innerHTML=DISC.map(d=>`<button class="chip" aria-pressed="${d==="Todas"}" data-d="${d}">${d}</button>`).join("");
    const renderSrc=()=>{
      const s=q.value.trim().toLowerCase();
      const rows=SOURCES.filter(x=>(disc==="Todas"||x.d===disc)&&(!s||(x.org+x.inst+x.d+x.what).toLowerCase().includes(s)));
      body.innerHTML=rows.length?rows.map(x=>`<tr><td><span class="org">${x.org}</span><small>${x.inst}</small></td><td>${x.d}</td><td>${x.what}</td><td>${x.lic}</td><td><span class="status ${x.st}">${x.st==="ok"?"Identificada":"Por confirmar"}</span></td></tr>`).join("")
        :`<tr><td colspan="5" class="empty">No hay fuentes que coincidan con “${q.value.replace(/[<>&"]/g,"")}”. Prueba con otra palabra o quita el filtro de disciplina.</td></tr>`;
    };
    chips.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;disc=b.dataset.d;chips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b?"true":"false"));renderSrc();});
    q.addEventListener("input",renderSrc);
    renderSrc();
  }

  // Copiar
  const toast=$("toast");let tt;
  function say(m){if(!toast)return;toast.textContent=m;toast.hidden=false;clearTimeout(tt);tt=setTimeout(()=>toast.hidden=true,1800);}
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-copy],[data-copy-el]");if(!b)return;
    const el=b.dataset.copyEl?$(b.dataset.copyEl):null;
    const text=b.dataset.copy||el.textContent;
    const fallback=()=>{const n=el||$("mail");if(!n)return;const r=document.createRange();r.selectNodeContents(n);const s=getSelection();s.removeAllRanges();s.addRange(r);say("Texto seleccionado. Cópialo con Ctrl+C.");};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>say("Copiado"),fallback);}else fallback();
  });

  // Cuenta regresiva
  if($("cd-d")){
    const target=new Date("2027-01-01T00:00:00-06:00").getTime();
    const tick=()=>{
      const d=Math.max(0,target-Date.now());
      $("cd-d").textContent=Math.floor(d/864e5);$("cd-h").textContent=String(Math.floor(d%864e5/36e5)).padStart(2,"0");$("cd-m").textContent=String(Math.floor(d%36e5/6e4)).padStart(2,"0");
    };
    tick();setInterval(tick,30000);
  }

  // Portada: curvas de nivel animadas
  const topo=$("topo");
  if(topo){
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tStart=performance.now();
    const drawTopo=now=>{
      const r=topo.getBoundingClientRect();if(!r.width)return;
      const dpr=Math.min(2,window.devicePixelRatio||1);
      if(topo.width!==Math.round(r.width*dpr)){topo.width=r.width*dpr;topo.height=r.height*dpr;}
      const ctx=topo.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,r.width,r.height);
      const t=reduce?0:(now-tStart)/9000;
      ctx.lineWidth=1;
      contours(ctx,r.width,r.height,t,0.4,[-1.4,-1,-.6,-.2,.2,.6,1,1.4],i=>i===4?css("--teal"):css("--contour"),10);
    };
    const loop=now=>{drawTopo(now);if(!reduce)requestAnimationFrame(loop);};
    requestAnimationFrame(loop);
  }

  // Globo terrestre (proyección ortográfica, dibujado en código: sin material de terceros)
  const globe=$("globe");
  if(globe){
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const D=Math.PI/180, TILT=23.44*D, VIEW_LAT=12*D;
    const sinV=Math.sin(VIEW_LAT), cosV=Math.cos(VIEW_LAT);
    const t0=performance.now();
    const proj=(lat,lon,lon0,R)=>{
      const p=lat*D,l=(lon-lon0)*D,cp=Math.cos(p);
      const vis=sinV*Math.sin(p)+cosV*cp*Math.cos(l);
      const x=R*cp*Math.sin(l), y=-R*(cosV*Math.sin(p)-sinV*cp*Math.cos(l));
      return [x*Math.cos(TILT)-y*Math.sin(TILT), x*Math.sin(TILT)+y*Math.cos(TILT), vis];
    };
    const line=(ctx,pts,lon0,R)=>{
      let pen=false;ctx.beginPath();
      for(const [la,lo] of pts){const [x,y,v]=proj(la,lo,lon0,R);if(v>0){pen?ctx.lineTo(x,y):ctx.moveTo(x,y);pen=true;}else pen=false;}
      ctx.stroke();
    };
    const range=(a,b,s)=>{const r=[];for(let v=a;v<=b+1e-9;v+=s)r.push(v);return r;};
    const drawGlobe=now=>{
      const r=globe.getBoundingClientRect(); if(!r.width)return;
      const dpr=Math.min(2,window.devicePixelRatio||1), W=r.width;
      if(globe.width!==Math.round(W*dpr)){globe.width=W*dpr;globe.height=W*dpr;}
      const ctx=globe.getContext("2d");ctx.setTransform(dpr,0,0,dpr,W/2*dpr,W/2*dpr);ctx.clearRect(-W/2,-W/2,W,W);
      const R=W*0.44, lon0=reduce?-100:-100+((now-t0)/1000)*9;
      // eje de rotación inclinado
      ctx.strokeStyle=css("--line");ctx.lineWidth=1;ctx.setLineDash([3,4]);
      ctx.beginPath();ctx.moveTo(Math.sin(TILT)*R*1.18,-Math.cos(TILT)*R*1.18);ctx.lineTo(-Math.sin(TILT)*R*1.18,Math.cos(TILT)*R*1.18);ctx.stroke();ctx.setLineDash([]);
      // océano
      const g=ctx.createRadialGradient(-R*.35,-R*.35,R*.1,0,0,R);
      g.addColorStop(0,css("--blue-soft"));g.addColorStop(1,css("--surface"));
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=css("--blue");ctx.lineWidth=1.5;ctx.stroke();
      // retícula cada 15°
      ctx.strokeStyle=css("--contour");ctx.lineWidth=1;
      for(const lat of range(-75,75,15))line(ctx,range(-180,180,3).map(lo=>[lat,lo]),lon0,R);
      for(const lon of range(-180,165,15))line(ctx,range(-90,90,3).map(la=>[la,lon]),lon0,R);
      // ecuador y Trópico de Cáncer
      ctx.lineWidth=1.6;ctx.strokeStyle=css("--teal");line(ctx,range(-180,180,2).map(lo=>[0,lo]),lon0,R);
      ctx.strokeStyle=css("--ochre");line(ctx,range(-180,180,2).map(lo=>[23.44,lo]),lon0,R);
      // Ciudad de México
      const [cx,cy,cv]=proj(19.43,-99.13,lon0,R);
      if(cv>0){const pulse=reduce?0:(Math.sin(now/400)+1)/2;
        ctx.fillStyle=css("--ochre");ctx.globalAlpha=.25;ctx.beginPath();ctx.arc(cx,cy,4+pulse*5,0,Math.PI*2);ctx.fill();
        ctx.globalAlpha=1;ctx.beginPath();ctx.arc(cx,cy,3.5,0,Math.PI*2);ctx.fill();}
    };
    const loopG=now=>{drawGlobe(now);if(!reduce)requestAnimationFrame(loopG);};
    requestAnimationFrame(loopG);
    window.__omctGlobe=()=>drawGlobe(performance.now());
  }

  // Menú y página actual
  const nav=$("mainNav"),menuBtn=$("menuBtn");
  const page=document.body.dataset.page;
  nav.querySelectorAll("a").forEach(a=>{if(a.dataset.p===page)a.setAttribute("aria-current","page");});
  menuBtn.addEventListener("click",()=>{const o=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",o);});

  paintFigs(document);
  let rz;window.addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>paintFigs(document),200);});
})();
