(function(){
  // ---------- Datos ----------
  const SOURCES = [
    {id:"ssn",org:"Servicio Sismológico Nacional (SSN)",inst:"UNAM",esf:["Geósfera"],what:"Catálogo de sismos de México, reportes especiales de sismos relevantes y datos de su red de estaciones.",fmt:"CSV, reportes en PDF",acc:"Descarga libre",lic:"Uso libre con cita al SSN según sus términos",st:"pend",url:"http://www.ssn.unam.mx",inf:"inf-sismo",tut:"tut-ssn"},
    {id:"smn",org:"Servicio Meteorológico Nacional (SMN)",inst:"CONAGUA",esf:["Atmósfera","Hidrósfera"],what:"Normales climatológicas, datos diarios de estaciones, pronósticos e imágenes de satélite meteorológico.",fmt:"CSV, TXT, imágenes",acc:"Descarga libre",lic:"Probablemente Libre Uso MX",st:"pend",url:"https://smn.conagua.gob.mx"},
    {id:"inegi",org:"INEGI",inst:"Gobierno de México",esf:["Geósfera","Biósfera","Hidrósfera"],what:"Continuo de elevaciones, cartas de edafología, geología, hidrología y uso de suelo y vegetación.",fmt:"GeoTIFF, Shapefile, PDF",acc:"Descarga libre",lic:"Términos de Libre Uso de la Información del INEGI",st:"ok",url:"https://www.inegi.org.mx",tut:"tut-inegi"},
    {id:"sgm",org:"Servicio Geológico Mexicano (SGM)",inst:"Gobierno de México",esf:["Geósfera"],what:"Cartografía geológica, geoquímica y magnetometría del país en la plataforma GeoInfoMex.",fmt:"Shapefile, PDF",acc:"Descarga libre",lic:"Uso libre con atribución, por confirmar",st:"pend",url:"https://www.sgm.gob.mx"},
    {id:"conabio",org:"Geoportal de la CONABIO",inst:"Gobierno de México",esf:["Biósfera"],what:"Capas de biodiversidad, vegetación, ecorregiones, áreas naturales y cuencas.",fmt:"Shapefile, KML",acc:"Descarga libre",lic:"Varía por capa",st:"pend",url:"http://geoportal.conabio.gob.mx"},
    {id:"datosgob",org:"datos.gob.mx",inst:"Gobierno de México",esf:["Atmósfera","Hidrósfera","Geósfera","Biósfera"],what:"Portal federal de datos abiertos que reúne conjuntos de varias dependencias.",fmt:"CSV y otros",acc:"Descarga libre",lic:"Libre Uso MX",st:"ok",url:"https://datos.gob.mx"},
    {id:"nasa",org:"NASA Earthdata",inst:"NASA (EE. UU.)",esf:["Atmósfera","Hidrósfera","Criósfera","Geósfera","Biósfera"],what:"Productos satelitales como MODIS, Landsat, ECOSTRESS y GPM, con cobertura global.",fmt:"HDF, NetCDF, GeoTIFF",acc:"Registro gratuito",lic:"Sin derechos de autor en general; se pide atribución",st:"ok",url:"https://www.earthdata.nasa.gov",tut:"tut-ecostress"},
    {id:"noaa",org:"NOAA NCEI",inst:"NOAA (EE. UU.)",esf:["Hidrósfera","Atmósfera"],what:"Temperatura del mar, batimetría, registros climáticos históricos y trayectorias de huracanes.",fmt:"NetCDF, CSV",acc:"Descarga libre",lic:"Dominio público (gobierno de EE. UU.) en general",st:"ok",url:"https://www.ncei.noaa.gov"},
    {id:"copernicus",org:"Copernicus Data Space",inst:"Unión Europea / ESA",esf:["Atmósfera","Hidrósfera","Criósfera","Geósfera","Biósfera"],what:"Imágenes Sentinel-1, -2, -3 y -5P, y productos de composición de la atmósfera.",fmt:"SAFE, NetCDF, JPEG 2000",acc:"Registro gratuito",lic:"Acceso libre y abierto con atribución obligatoria",st:"ok",url:"https://dataspace.copernicus.eu"}
  ];
  const DISC = ["Todas","Atmósfera","Hidrósfera","Criósfera","Geósfera","Biósfera"];

  const NEWS = [
    {type:"Tutorial",cls:"teal",title:"Islas de calor en Monterrey con ECOSTRESS",text:"Descarga y mapea la temperatura de superficie del área metropolitana.",credit:"Ilustración de maqueta",pal:"heat"},
    {type:"Infografía",cls:"blue",title:"Cómo se localiza un sismo",text:"Ondas P y S, estaciones y triangulación, explicadas en una sola lámina.",credit:"Ilustración de maqueta",pal:"seis"},
    {type:"Base de datos",cls:"ochre",title:"Fallas activas del Eje Neovolcánico",text:"Base de datos con DOI, metodología y capas descargables.",credit:"Ilustración de maqueta",pal:"geo"}
  ];
  const TUTS = [
    {id:"inf-sismo",r:["estudiante","docente"],type:"Infografía",cls:"blue",title:"Cómo se localiza un sismo",text:"Del sismograma al epicentro, paso a paso.",lvl:"Básico",time:"2 min",esf:["Geósfera"],pal:"seis"},
    {id:"dilo-precipitacion",r:["estudiante","docente"],type:"Dilo en ciencia",cls:"ochre",title:"Lluvia → precipitación",text:"Por qué no son lo mismo y cómo se mide en milímetros.",lvl:"Básico",time:"1 min",esf:["Atmósfera"],pal:"ocean"},
    {id:"tut-ssn",r:["estudiante","investigador"],type:"Tutorial",cls:"teal",title:"Catálogo del SSN en Python",text:"Descarga, limpia y grafica la sismicidad de un estado.",lvl:"Intermedio",time:"40 min",esf:["Geósfera"],pal:"seis"},
    {id:"tut-ecostress",r:["investigador"],type:"Tutorial",cls:"teal",title:"Islas de calor con ECOSTRESS",text:"Temperatura de superficie sobre Monterrey con datos de NASA.",lvl:"Avanzado",time:"60 min",esf:["Atmósfera"],pal:"heat"},
    {id:"guia-sgm",r:["estudiante","docente"],type:"Guía",cls:"ochre",title:"Leer una carta geológica del SGM",text:"Simbología, unidades litológicas y estructuras.",lvl:"Básico",time:"15 min",esf:["Geósfera"],pal:"geo"},
    {id:"mat-huracanes",r:["docente"],type:"Material didáctico",cls:"blue",title:"Huracanes en el Pacífico mexicano",text:"Secuencia de clase con datos de NOAA y actividades.",lvl:"Básico",time:"2 sesiones",esf:["Atmósfera","Hidrósfera"],pal:"ocean"},
    {id:"tut-inegi",r:["investigador","estudiante"],type:"Tutorial",cls:"teal",title:"Perfiles topográficos con el CEM del INEGI",text:"Del modelo de elevación a un perfil en QGIS.",lvl:"Intermedio",time:"30 min",esf:["Geósfera"],pal:"geo"}
  ];
  const PRODS = [
    {type:"Base de datos",cls:"ochre",title:"Fallas activas del Eje Neovolcánico",text:"Capas vectoriales con atributos de cinemática y fuente bibliográfica.",lic:"CC BY 4.0",esf:["Geósfera"],pal:"geo"},
    {type:"Nota técnica",cls:"blue",title:"Control de calidad de series de radiación solar",text:"Método para detectar y corregir valores atípicos en datos solarimétricos.",lic:"CC BY 4.0",esf:["Atmósfera"],pal:"heat"},
    {type:"Informe",cls:"blue",title:"Sismicidad de México: balance anual",text:"Análisis del catálogo del SSN con gráficas y mapas reproducibles.",lic:"CC BY 4.0",esf:["Geósfera"],pal:"seis"},
    {type:"Capa geográfica",cls:"teal",title:"Temperatura superficial urbana 2026",text:"Mosaicos de las principales zonas metropolitanas del país.",lic:"CC BY 4.0",esf:["Atmósfera"],pal:"heat"}
  ];
  const TYPES_APRENDE = [
    ["Infografía","Pieza visual que explica un concepto, un proceso o un dato en una sola lámina.","Público general, docentes y redes sociales"],
    ["Tutorial","Procedimiento paso a paso con datos o herramientas reales que termina en un resultado concreto. Puede ser escrito, en video o en un cuaderno con código.","Todo público"],
    ["Guía","Texto de orientación para entender o interpretar algo. Se consulta, no se sigue paso a paso.","Estudiantes, docentes y público interesado"],
    ["Material didáctico","Secuencias de clase, actividades, ejercicios y evaluaciones para el aula, con notas para el docente.","Docentes de secundaria, bachillerato y universidad"],
    ["Problemario","Ejercicios con datos reales y sus soluciones explicadas, por niveles de dificultad.","Estudiantes"],
    ["Cuaderno interactivo","Explicación, código y resultados que se ejecutan en el navegador (Jupyter o Google Colab).","Investigadores y estudiantes avanzados"],
    ["Mapa o visualización interactiva","Mapa o gráfica que se explora: hacer zoom, filtrar, comparar años.","Público general y docentes"],
    ["Conjunto de datos didáctico","Una porción limpia y pequeña de datos reales, con su diccionario de variables, para practicar.","Estudiantes y docentes"],
    ["Dilo en ciencia","Serie breve que lleva una palabra cotidiana a su término científico preciso.","Público general, estudiantes y redes sociales"],
    ["Caso de estudio","Análisis aplicado a un lugar o evento de México, de la pregunta a la conclusión.","Estudiantes e investigadores"],
    ["Seminario web o clase grabada","Sesión en vivo con una persona especialista, que queda grabada con sus materiales.","Todo público"]
  ];
  const TYPES_PROD = [
    ["Base de datos","Conjunto de datos organizado y documentado, generado o integrado por el OMCT, con diccionario de variables y metadatos.","Investigadores y estudiantes de posgrado"],
    ["Capa geográfica","Información espacial lista para un sistema de información geográfica, con sistema de coordenadas declarado.","Investigadores, analistas SIG y gobiernos locales"],
    ["Nota técnica","Comunicación breve sobre un método, un conjunto de datos o un resultado preliminar, con estructura científica.","Investigadores"],
    ["Informe","Análisis amplio de un tema o periodo, con resumen ejecutivo, metodología, resultados y conclusiones.","Investigadores, instituciones y tomadores de decisiones"],
    ["Software o herramienta","Programa, script o paquete de código abierto para procesar o analizar datos.","Investigadores y estudiantes de programación científica"],
    ["Nota para tomadores de decisiones","Resumen breve que traduce resultados científicos en información útil, sin postura partidista.","Gobierno, instituciones y organizaciones civiles"],
    ["Estado del conocimiento","Síntesis de lo que se sabe sobre un tema en México; identifica vacíos de investigación.","Estudiantes de posgrado e investigadores que inician un tema"]
  ];
  const ESFERAS = ["Atmósfera","Hidrósfera","Criósfera","Geósfera","Biósfera"];

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
    return `<article class="card"${o.id?` id="${o.id}"`:""}><div class="fig"><canvas data-pal="${o.pal}" aria-hidden="true"></canvas><span class="credit">${o.credit||"Ilustración de maqueta"}</span></div>
    <div class="body"><div class="meta"><span class="pill ${o.cls}">${o.type}</span>${extra||""}</div><h3>${o.title}</h3><p>${o.text}</p></div></article>`;
  }
  function paintFigs(root){root.querySelectorAll(".fig canvas").forEach((c,i)=>drawFig(c,c.dataset.pal,1.7+i*1.3));}


  const $=id=>document.getElementById(id);
  // Novedades
  const news=$("newsCards");
  if(news){news.innerHTML=NEWS.map(o=>cardHTML(o)).join("");}
  const escH=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const chipRow=(el,label,opts,key)=>{el.innerHTML=`<span class="chip-label">${label}</span>`+["Todos",...opts].map(o=>`<button class="chip" aria-pressed="${o==="Todos"}" data-${key}="${o}">${o}</button>`).join("");};
  const pressOne=(el,b)=>el.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b?"true":"false"));
  const typeGrid=(el,list)=>{el.innerHTML=list.map(([n,d,i])=>`<div class="type-item"><h3>${n}</h3><p>${d}</p><small>Ideal para: ${i}</small></div>`).join("");};
  const esfTags=e=>e.map(x=>`<span class="esf-tag">${x}</span>`).join("");

  // Productos
  const prod=$("prodCards");
  if(prod){
    let pT="Todos",pE="Todos";
    const tc=$("prodType"),ec=$("prodEsf");
    chipRow(tc,"Tipo",[...new Set(PRODS.map(p=>p.type))],"t");
    chipRow(ec,"Esfera",ESFERAS.filter(e=>PRODS.some(p=>p.esf.includes(e))),"e");
    const renderProd=()=>{
      const list=PRODS.filter(p=>(pT==="Todos"||p.type===pT)&&(pE==="Todos"||p.esf.includes(pE)));
      prod.innerHTML=list.length?list.map(o=>cardHTML(o,`<span class="pill line">${o.lic}</span>`).replace('</p></div></article>',`</p><div class="esf-row">${esfTags(o.esf)}</div><p style="font-size:.85rem;color:var(--ink)">Autoría: Nombre Apellido</p><p class="mono" style="font-size:.78rem">DOI 10.5281/zenodo.XXXXXXX</p></div></article>`)).join(""):`<p class="empty">Aún no hay productos con esa combinación. Prueba con otro tipo o esfera.</p>`;
      paintFigs(prod);
    };
    tc.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;pT=b.dataset.t;pressOne(tc,b);renderProd();});
    ec.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;pE=b.dataset.e;pressOne(ec,b);renderProd();});
    renderProd();
  }
  if($("typesP"))typeGrid($("typesP"),TYPES_PROD);
  if($("typesA"))typeGrid($("typesA"),TYPES_APRENDE);

  // Tutoriales
  const tut=$("tutCards");
  let aR="todas",aT="Todos",aE="Todos";
  const atc=$("aprType"),aec=$("aprEsf");
  if(tut){
    chipRow(atc,"Tipo",[...new Set(TUTS.map(x=>x.type))],"t");
    chipRow(aec,"Esfera",ESFERAS.filter(e=>TUTS.some(x=>x.esf.includes(e))),"e");
    atc.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;aT=b.dataset.t;pressOne(atc,b);renderTuts(aR);});
    aec.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;aE=b.dataset.e;pressOne(aec,b);renderTuts(aR);});
  }
  function renderTuts(r){
    if(!tut)return;
    aR=r;
    const list=TUTS.filter(x=>(r==="todas"||x.r.includes(r))&&(aT==="Todos"||x.type===aT)&&(aE==="Todos"||x.esf.includes(aE)));
    tut.innerHTML=list.length?list.map(o=>cardHTML(o,`<span class="pill line">${o.lvl}</span><span class="mono time">${o.time}</span>`).replace('</p></div></article>',`</p><div class="esf-row">${esfTags(o.esf)}</div></div></article>`)).join(""):`<p class="empty">Aún no hay recursos con esa combinación. Prueba con otro público, tipo o esfera.</p>`;
    paintFigs(tut);
  }
  document.querySelectorAll("#routes .route").forEach(b=>b.addEventListener("click",()=>{
    document.querySelectorAll("#routes .route").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
    renderTuts(b.dataset.r);
  }));
  renderTuts("todas");
  if(tut&&location.hash){const el=document.getElementById(location.hash.slice(1));if(el&&tut.contains(el)){el.classList.add("is-target");setTimeout(()=>el.scrollIntoView({block:"center"}),80);}}

  // Fuentes
  const chips=$("chips"),q=$("q"),body=$("srcGrid");
  if(chips&&q&&body){
    let disc="Todas";
    const TITLES={};TUTS.forEach(x=>TITLES[x.id]=x.title);
    const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
    chips.innerHTML=DISC.map(d=>`<button class="chip" aria-pressed="${d==="Todas"}" data-d="${d}">${d}</button>`).join("");
    const learn=x=>{
      const l=[];
      if(x.inf)l.push(`<a class="learn" href="aprende.html#${x.inf}"><span class="pill blue">Infografía</span>${esc(TITLES[x.inf]||"")}</a>`);
      if(x.tut)l.push(`<a class="learn" href="aprende.html#${x.tut}"><span class="pill teal">Tutorial</span>${esc(TITLES[x.tut]||"")}</a>`);
      return l.length?`<div class="src-learn"><span class="eyebrow">Aprende a usarla</span>${l.join("")}</div>`:"";
    };
    const renderSrc=()=>{
      const s=q.value.trim().toLowerCase();
      const rows=SOURCES.filter(x=>(disc==="Todas"||x.esf.includes(disc))&&(!s||(x.org+x.inst+x.esf.join(" ")+x.what+x.fmt).toLowerCase().includes(s)));
      body.innerHTML=rows.length?rows.map(x=>`<article class="src-card" id="f-${x.id}">
        <header><h3>${x.org}</h3><small>${x.inst}</small></header>
        <div class="src-esf">${x.esf.length===5?'<span class="pill line">Todas las esferas</span>':x.esf.map(e=>`<span class="pill line">${e}</span>`).join("")}</div>
        <p>${x.what}</p>
        <dl>
          <div><dt>Formatos</dt><dd>${x.fmt}</dd></div>
          <div><dt>Acceso</dt><dd>${x.acc}</dd></div>
          <div><dt>Licencia</dt><dd>${x.lic} <span class="status ${x.st}">${x.st==="ok"?"Identificada":"Por confirmar"}</span></dd></div>
        </dl>
        ${learn(x)}
        <a class="src-go" href="${x.url}" rel="noopener" target="_blank">Ir al portal ↗</a>
      </article>`).join("")
        :`<p class="empty">No hay fuentes que coincidan con “${esc(q.value)}”. Prueba con otra palabra o quita el filtro de esfera.</p>`;
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

  // Figura de corrección: una señal con un valor atípico que se detecta y se corrige (dibujada en código)
  const fix=$("fixfig");
  if(fix){
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CYCLE=7000, t0=performance.now();
    const ease=x=>x<0?0:x>1?1:x*x*(3-2*x);
    const sig=(x,ph)=>Math.sin(x*0.09+ph)*0.35+Math.sin(x*0.23-ph*1.7)*0.22+Math.sin(x*0.57+ph*0.6)*0.12;
    const drawFix=now=>{
      const r=fix.getBoundingClientRect(); if(!r.width)return;
      const dpr=Math.min(2,window.devicePixelRatio||1), W=r.width, H=r.height;
      if(fix.width!==Math.round(W*dpr)){fix.width=W*dpr;fix.height=H*dpr;}
      const ctx=fix.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
      const t=reduce?CYCLE*0.45:(now-t0)%CYCLE, ph=reduce?0:(now-t0)/1600;
      // fases: 0–25% normal, 25–40% aparece el error, 40–60% marcado, 60–75% se corrige, 75–100% corregido
      const p=t/CYCLE;
      const spike=p<0.25?0:p<0.40?ease((p-0.25)/0.15):p<0.60?1:p<0.75?1-ease((p-0.60)/0.15):0;
      const fixed=p>=0.60, mid=H*0.55, amp=H*0.18, sx=W*0.64;
      // rejilla
      ctx.strokeStyle=css("--line");ctx.lineWidth=1;
      for(let gx=0;gx<W;gx+=W/12){ctx.beginPath();ctx.moveTo(gx,H*0.15);ctx.lineTo(gx,H*0.92);ctx.stroke();}
      ctx.beginPath();ctx.moveTo(0,mid);ctx.lineTo(W,mid);ctx.stroke();
      // señal
      const spikeAt=x=>{const d=(x-sx)/(W*0.018);return -Math.exp(-d*d)*H*0.42*spike;};
      ctx.strokeStyle=css("--blue");ctx.lineWidth=1.8;ctx.beginPath();
      for(let x=0;x<=W;x+=2){const y=mid-sig(x,ph)*amp+spikeAt(x);x?ctx.lineTo(x,y):ctx.moveTo(x,y);}
      ctx.stroke();
      // marca del error
      const font=(s)=>`500 ${s}px "IBM Plex Mono", ui-monospace, monospace`;
      if(spike>0.05&&!fixed){
        const y=mid-sig(sx,ph)*amp-H*0.42*spike;
        ctx.globalAlpha=Math.min(1,spike*1.4);
        ctx.strokeStyle=css("--ochre");ctx.lineWidth=2;ctx.setLineDash([4,3]);
        ctx.beginPath();ctx.arc(sx,y+H*0.04,H*0.12,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle=css("--ochre");ctx.font=font(Math.max(10,W*0.024));ctx.textAlign="right";
        ctx.fillText("Valor atípico detectado",sx-H*0.17,Math.max(H*0.12,y+H*0.05));
        ctx.globalAlpha=1;
      }
      if(fixed){
        const a=p<0.75?ease((p-0.60)/0.15):1;
        ctx.globalAlpha=a;ctx.fillStyle=css("--teal");ctx.font=font(Math.max(10,W*0.024));ctx.textAlign="left";
        ctx.textAlign="center";ctx.fillText("Corregido · versión 1.1",sx,H*0.12);
        ctx.beginPath();ctx.arc(sx,mid-sig(sx,ph)*amp,3.5,0,Math.PI*2);ctx.fill();
        ctx.globalAlpha=1;
      }
      ctx.fillStyle=css("--muted");ctx.font=font(Math.max(9,W*0.02));ctx.textAlign="left";
      ctx.fillText(p<0.60?"versión 1.0":"versión 1.1",8,H-8);
    };
    const loopF=now=>{drawFix(now);if(!reduce)requestAnimationFrame(loopF);};
    requestAnimationFrame(loopF);
  }

  // Menú y página actual
  const nav=$("mainNav"),menuBtn=$("menuBtn");
  const page=document.body.dataset.page;
  nav.querySelectorAll("a").forEach(a=>{if(a.dataset.p===page)a.setAttribute("aria-current","page");});
  menuBtn.addEventListener("click",()=>{const o=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",o);});

  paintFigs(document);
  let rz;window.addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>paintFigs(document),200);});
})();
