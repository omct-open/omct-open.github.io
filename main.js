(function(){
  // ---------- Datos ----------
  const SOURCES = [
    {id:"ssn",ic:"sismos",org:"Servicio Sismológico Nacional (SSN)",inst:"UNAM",esf:["Geósfera"],what:"Catálogo de sismos de México, reportes especiales de sismos relevantes y datos de su red de estaciones.",fmt:"CSV, reportes en PDF",acc:"Descarga libre",lic:"Uso libre con cita al SSN según sus términos",st:"pend",url:"http://www.ssn.unam.mx",inf:"inf-sismo",tut:"tut-ssn"},
    {id:"smn",ic:"temperatura",org:"Servicio Meteorológico Nacional (SMN)",inst:"CONAGUA",esf:["Atmósfera","Hidrósfera"],what:"Normales climatológicas, datos diarios de estaciones, pronósticos e imágenes de satélite meteorológico.",fmt:"CSV, TXT, imágenes",acc:"Descarga libre",lic:"Probablemente Libre Uso MX",st:"pend",url:"https://smn.conagua.gob.mx"},
    {id:"inegi",ic:"mapas",org:"INEGI",inst:"Gobierno de México",esf:["Geósfera","Biósfera","Hidrósfera"],what:"Continuo de elevaciones, cartas de edafología, geología, hidrología y uso de suelo y vegetación.",fmt:"GeoTIFF, Shapefile, PDF",acc:"Descarga libre",lic:"Términos de Libre Uso de la Información del INEGI",st:"ok",url:"https://www.inegi.org.mx",tut:"tut-inegi"},
    {id:"sgm",ic:"mapas",org:"Servicio Geológico Mexicano (SGM)",inst:"Gobierno de México",esf:["Geósfera"],what:"Cartografía geológica, geoquímica y magnetometría del país en la plataforma GeoInfoMex.",fmt:"Shapefile, PDF",acc:"Descarga libre",lic:"Uso libre con atribución, por confirmar",st:"pend",url:"https://www.sgm.gob.mx"},
    {id:"conabio",ic:"flora",org:"Geoportal de la CONABIO",inst:"Gobierno de México",esf:["Biósfera"],what:"Capas de biodiversidad, vegetación, ecorregiones, áreas naturales y cuencas.",fmt:"Shapefile, KML",acc:"Descarga libre",lic:"Varía por capa",st:"pend",url:"http://geoportal.conabio.gob.mx"},
    {id:"datosgob",ic:"datos",org:"datos.gob.mx",inst:"Gobierno de México",esf:["Atmósfera","Hidrósfera","Geósfera","Biósfera"],what:"Portal federal de datos abiertos que reúne conjuntos de varias dependencias.",fmt:"CSV y otros",acc:"Descarga libre",lic:"Libre Uso MX",st:"ok",url:"https://datos.gob.mx"},
    {id:"nasa",ic:"teledeteccion",org:"NASA Earthdata",inst:"NASA (EE. UU.)",esf:["Atmósfera","Hidrósfera","Criósfera","Geósfera","Biósfera"],what:"Productos satelitales como MODIS, Landsat, ECOSTRESS y GPM, con cobertura global.",fmt:"HDF, NetCDF, GeoTIFF",acc:"Registro gratuito",lic:"Sin derechos de autor en general; se pide atribución",st:"ok",url:"https://www.earthdata.nasa.gov",tut:"tut-ecostress"},
    {id:"noaa",ic:"temperatura",org:"NOAA NCEI",inst:"NOAA (EE. UU.)",esf:["Hidrósfera","Atmósfera"],what:"Temperatura del mar, batimetría, registros climáticos históricos y trayectorias de huracanes.",fmt:"NetCDF, CSV",acc:"Descarga libre",lic:"Dominio público (gobierno de EE. UU.) en general",st:"ok",url:"https://www.ncei.noaa.gov"},
    {id:"copernicus",ic:"teledeteccion",org:"Copernicus Data Space",inst:"Unión Europea / ESA",esf:["Atmósfera","Hidrósfera","Criósfera","Geósfera","Biósfera"],what:"Imágenes Sentinel-1, -2, -3 y -5P, y productos de composición de la atmósfera.",fmt:"SAFE, NetCDF, JPEG 2000",acc:"Registro gratuito",lic:"Acceso libre y abierto con atribución obligatoria",st:"ok",url:"https://dataspace.copernicus.eu"}
  ];
  // Iconografía del OMCT (moodboard): esferas y complementarios
  const ICONS = {"atmosfera": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#4167BC\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g stroke=\"#C16210\"><circle cx=\"40\" cy=\"21\" r=\"5\"></circle><path d=\"M40 11.5v2.5M47 14l-1.8 1.8M49.5 21H47M33 14l1.8 1.8\"></path></g><path d=\"M20.5 37h21a6 6 0 0 0 .6-12 8.5 8.5 0 0 0-16.2-1.6A6.8 6.8 0 0 0 20.5 37Z\" fill=\"#FFFFFF\" stroke=\"#4167BC\"></path><path d=\"M22 43h20M27 48h15\" stroke=\"#2EA1E8\"></path></g></svg>", "hidrosfera": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#2EA1E8\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M32 12c-5 7-7.5 10.5-7.5 14.5a7.5 7.5 0 0 0 15 0c0-4-2.5-7.5-7.5-14.5Z\" stroke=\"#2EA1E8\"></path><path d=\"M29.2 28.5a3.6 3.6 0 0 0 3.8 3.4\" stroke=\"#4366AF\"></path><path d=\"M16 41.5c2.7-2.2 5.3-2.2 8 0s5.3 2.2 8 0 5.3-2.2 8 0 5.3 2.2 8 0\" stroke=\"#2EA1E8\"></path><path d=\"M16 48c2.7-2.2 5.3-2.2 8 0s5.3 2.2 8 0 5.3-2.2 8 0 5.3 2.2 8 0\" stroke=\"#4366AF\"></path></g></svg>", "criosfera": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#7F7BD0\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 46 26 27l7 10 6-7 11 16Z\" stroke=\"#4B4796\"></path><path d=\"M22 33.5l3.5-2 3 2.5 2.5-2\" stroke=\"#7F7BD0\"></path><path d=\"M45 11v12M39.8 14l10.4 6M39.8 20l10.4-6\" stroke=\"#7F7BD0\"></path><path d=\"M19 51.5h26\" stroke=\"#7F7BD0\" stroke-dasharray=\"4 4\"></path></g></svg>", "geosfera": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#C16210\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 47 26 29h12l12 18Z\" fill=\"#FFFFFF\" stroke=\"#A54402\"></path><path d=\"M28.5 29l3.5 6 3.5-6\" stroke=\"#C16210\"></path><circle cx=\"36\" cy=\"20\" r=\"3\" stroke=\"#C16210\"></circle><circle cx=\"41.5\" cy=\"13.5\" r=\"2.2\" stroke=\"#C16210\"></circle><path d=\"M18 52.5h28\" stroke=\"#C16210\"></path></g></svg>", "biosfera": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#41B79D\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 44c0-16 10-26 26-26 0 16-10 26-26 26Z\" stroke=\"#2E8F7A\"></path><path d=\"M20 44l18-18M27 37h7M31 33v-7\" stroke=\"#41B79D\"></path><path d=\"M24 51h16\" stroke=\"#41B79D\"></path></g></svg>", "sistema_tierra": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#55627A\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><defs><clipPath id=\"cp-st\"><circle cx=\"32\" cy=\"32\" r=\"17\"></circle></clipPath></defs><g clip-path=\"url(#cp-st)\"><path d=\"M10 25C18 19 26 31 34 24S48 15 56 19\" stroke=\"#C16210\" stroke-width=\"3.6\"></path><path d=\"M8 33C17 27 26 39 35 32S49 23 56 27\" stroke=\"#4167BC\" stroke-width=\"3.6\"></path><path d=\"M8 41C17 35 26 47 35 40S49 31 56 35\" stroke=\"#41B79D\" stroke-width=\"3.6\"></path><path d=\"M10 49C18 43 27 55 36 48S49 39 56 43\" stroke=\"#40ADB8\" stroke-width=\"3.6\"></path></g><circle cx=\"32\" cy=\"32\" r=\"17\" stroke=\"#55627A\"></circle></g></svg>", "analisis": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#6A4C9C\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"28\" cy=\"28\" r=\"12\" stroke=\"#6A4C9C\"></circle><path d=\"M37 37l11 11\" stroke=\"#6A4C9C\" stroke-width=\"3.4\"></path><path d=\"M21.5 32l4-4.5 3 3 6-7\" stroke=\"#E8762C\"></path></g></svg>", "graficas": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#4167BC\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"22\" y=\"34\" width=\"6\" height=\"14\" rx=\"1.5\" fill=\"#2EA1E8\" stroke=\"none\"></rect><rect x=\"31\" y=\"26\" width=\"6\" height=\"22\" rx=\"1.5\" fill=\"#4167BC\" stroke=\"none\"></rect><rect x=\"40\" y=\"19\" width=\"6\" height=\"29\" rx=\"1.5\" fill=\"#0C193A\" stroke=\"none\"></rect><path d=\"M16 15v33.5h33\" stroke=\"#55627A\"></path></g></svg>", "fauna": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#F29A3D\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"#F29A3D\" stroke=\"#A54402\" stroke-width=\"2\"><path d=\"M30.5 26C24 16 14 17.5 15 26.5c.8 6 9 6.5 15.5 4.5Z\"></path><path d=\"M33.5 26C40 16 50 17.5 49 26.5c-.8 6-9 6.5-15.5 4.5Z\"></path><path d=\"M30.5 33.5c-7 0-11.5 4.5-9.5 9.5 2 4 8 1.5 9.5-5Z\"></path><path d=\"M33.5 33.5c7 0 11.5 4.5 9.5 9.5-2 4-8 1.5-9.5-5Z\"></path></g><path d=\"M32 23v21M32 23l-3.5-5.5M32 23l3.5-5.5\" stroke=\"#0C193A\"></path></g></svg>", "flora": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#2E8F7A\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M28 50V20a4 4 0 0 1 8 0v30M28 38h-4.5a3.5 3.5 0 0 1-3.5-3.5V28M36 33h4.5a3.5 3.5 0 0 0 3.5-3.5V24\" stroke=\"#2E8F7A\"></path><circle cx=\"32\" cy=\"12.5\" r=\"2.4\" fill=\"#E8762C\" stroke=\"none\"></circle><path d=\"M18 50.5h28\" stroke=\"#41B79D\"></path></g></svg>", "mapas": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#4366AF\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 21l11-4 14 5 11-4v26l-11 4-14-5-11 4Z\" stroke=\"#4366AF\"></path><path d=\"M25 17v26M39 22v26\" stroke=\"#4366AF\" stroke-width=\"1.6\" stroke-dasharray=\"2 3\"></path><path d=\"M32 41c-4.5-5-6.5-8.2-6.5-11.2a6.5 6.5 0 0 1 13 0c0 3-2 6.2-6.5 11.2Z\" fill=\"#40ADB8\" stroke=\"#4366AF\"></path><circle cx=\"32\" cy=\"29.8\" r=\"2\" fill=\"#FFFFFF\" stroke=\"none\"></circle></g></svg>", "datos": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#55627A\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><ellipse cx=\"32\" cy=\"19\" rx=\"13\" ry=\"5\" stroke=\"#55627A\"></ellipse><path d=\"M19 19v25c0 2.8 5.8 5 13 5s13-2.2 13-5V19\" stroke=\"#55627A\"></path><path d=\"M19 27.5c0 2.8 5.8 5 13 5s13-2.2 13-5\" stroke=\"#4167BC\"></path><path d=\"M19 36c0 2.8 5.8 5 13 5s13-2.2 13-5\" stroke=\"#6A4C9C\"></path></g></svg>", "teledeteccion": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#0C193A\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g transform=\"rotate(-35 39 22)\"><rect x=\"35\" y=\"18\" width=\"8\" height=\"8\" rx=\"1.5\" stroke=\"#0C193A\"></rect><rect x=\"25\" y=\"19\" width=\"7.5\" height=\"6\" rx=\"1\" fill=\"#2EA1E8\" stroke=\"#0C193A\" stroke-width=\"2\"></rect><rect x=\"45.5\" y=\"19\" width=\"7.5\" height=\"6\" rx=\"1\" fill=\"#2EA1E8\" stroke=\"#0C193A\" stroke-width=\"2\"></rect></g><circle cx=\"18\" cy=\"48\" r=\"2\" fill=\"#0C193A\" stroke=\"none\"></circle><path d=\"M18 41a7 7 0 0 1 7 7M18 35.5a12.5 12.5 0 0 1 12.5 12.5\" stroke=\"#2EA1E8\"></path></g></svg>", "sismos": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#A54402\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 34h8l3-9 4 18 4-24 4 22 3-12 3 5h11\" stroke=\"#A54402\"></path><path d=\"M17 48h30\" stroke=\"#E8762C\" stroke-dasharray=\"3 4\"></path></g></svg>", "temperatura": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#40ADB8\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M29 38V18a3 3 0 0 1 6 0v20a7 7 0 1 1-6 0Z\" stroke=\"#40ADB8\"></path><path d=\"M32 25v17\" stroke=\"#40ADB8\" stroke-width=\"3\"></path><circle cx=\"32\" cy=\"43.5\" r=\"3.6\" fill=\"#40ADB8\" stroke=\"none\"></circle><path d=\"M39.5 20h4.5M39.5 26h4.5M39.5 32h4.5\" stroke=\"#2EA1E8\"></path></g></svg>", "comunidad": "<svg viewBox=\"0 0 64 64\" aria-hidden=\"true\"><circle cx=\"32\" cy=\"32\" r=\"31\" fill=\"#FFFFFF\"></circle><circle cx=\"32\" cy=\"32\" r=\"30.4\" fill=\"none\" stroke=\"#9B86C9\" stroke-width=\"1.2\"></circle><g fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"32\" cy=\"23\" r=\"5\" stroke=\"#3E2A6B\"></circle><path d=\"M22 45c0-6 4.5-10 10-10s10 4 10 10\" stroke=\"#3E2A6B\"></path><circle cx=\"19\" cy=\"29\" r=\"3.5\" stroke=\"#9B86C9\"></circle><circle cx=\"45\" cy=\"29\" r=\"3.5\" stroke=\"#9B86C9\"></circle><path d=\"M12 45c0-4.5 3-7.5 7-7.5M52 45c0-4.5-3-7.5-7-7.5\" stroke=\"#9B86C9\"></path></g></svg>"};
  const DISC = ["Todas","Atmósfera","Hidrósfera","Criósfera","Geósfera","Biósfera"];

  const NEWS = [
    {type:"Tutorial",cls:"teal",title:"Islas de calor en Monterrey con ECOSTRESS",text:"Descarga y mapea la temperatura de superficie del área metropolitana.",credit:"Ilustración de maqueta",pal:"heat"},
    {type:"Infografía",cls:"blue",title:"Cómo se localiza un sismo",text:"Ondas P y S, estaciones y triangulación, explicadas en una sola lámina.",credit:"Ilustración de maqueta",pal:"seis"},
    {type:"Base de datos",cls:"ochre",title:"Fallas activas del Eje Neovolcánico",text:"Base de datos con DOI, metodología y capas descargables.",credit:"Ilustración de maqueta",pal:"geo"}
  ];
  const TUTS = [
    {id:"inf-sismo",r:["estudiante","docente"],type:"Infografía",cls:"blue",title:"Cómo se localiza un sismo",text:"Del sismograma al epicentro, paso a paso.",lvl:"Básico",time:"2 min",esf:["Geósfera"],pal:"seis"},
    {id:"dilo-precipitacion",r:["estudiante","docente"],type:"Dilo en ciencia",cls:"lav",title:"Lluvia → precipitación",text:"Por qué no son lo mismo y cómo se mide en milímetros.",lvl:"Básico",time:"1 min",esf:["Atmósfera"],pal:"ocean"},
    {id:"tut-ssn",r:["estudiante","investigador"],type:"Tutorial",cls:"teal",title:"Catálogo del SSN en Python",text:"Descarga, limpia y grafica la sismicidad de un estado.",lvl:"Intermedio",time:"40 min",esf:["Geósfera"],pal:"seis"},
    {id:"tut-ecostress",r:["investigador"],type:"Tutorial",cls:"teal",title:"Islas de calor con ECOSTRESS",text:"Temperatura de superficie sobre Monterrey con datos de NASA.",lvl:"Avanzado",time:"60 min",esf:["Atmósfera"],pal:"heat"},
    {id:"guia-sgm",r:["estudiante","docente"],type:"Guía",cls:"ochre",title:"Leer una carta geológica del SGM",text:"Simbología, unidades litológicas y estructuras.",lvl:"Básico",time:"15 min",esf:["Geósfera"],pal:"geo"},
    {id:"mat-huracanes",r:["docente"],type:"Material didáctico",cls:"blue",title:"Huracanes en el Pacífico mexicano",text:"Secuencia de clase con datos de NOAA y actividades.",lvl:"Básico",time:"2 sesiones",esf:["Atmósfera","Hidrósfera"],pal:"ocean"},
    {id:"articulo-mes",r:["estudiante","investigador","docente"],type:"Artículo del mes",ic:"fauna",cls:"lav",title:"Trepar, cavar y planear: las ardillas que conectan las esferas de la Tierra",text:"Reseña del artículo de Cab-Sulub y Morán-Gutiérrez (2027) en Therya Ixmana: 35 especies, tres formas de vida y por qué importan.",lvl:"Básico",time:"5 min",esf:["Biósfera"],img:"articulo-mes-lamina-v3.jpg",href:"articulo-mes.html",credit:"Lámina OMCT · vista preliminar"},
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
    ["Seminario web o clase grabada","Sesión en vivo con una persona especialista, que queda grabada con sus materiales.","Todo público"],
    ["Artículo del mes|fauna","Lectura comentada de un artículo científico sobre México, con tres preguntas a su autora o autor.","Estudiantes, investigadores y público interesado"]
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
  const MINI={
    "Atmósfera":['m-atm','<circle cx="12" cy="12" r="2.2"/><path d="M16.8 9.6a5.5 5.5 0 1 0 .4 4.6"/><path d="M5 16.6A8.2 8.2 0 0 0 18.8 17"/>'],
    "Hidrósfera":['m-hid','<circle cx="6.5" cy="15.5" r="1.6"/><path d="M6.5 5c3.3 0 4.6 3 6.4 6.8S16.5 18 19.5 19"/>'],
    "Criósfera":['m-cri','<path d="M12 4v16M5.1 8l13.8 8M5.1 16l13.8-8"/>'],
    "Geósfera":['m-geo','<path d="M2.5 12h4l1.8-4.5 3.2 10 3-12 2.6 9 1.6-2.5h2.8"/>'],
    "Biósfera":['m-bio','<circle cx="12" cy="8.5" r="4.5"/><path d="M12 13v8"/>'],
    "Todas":['m-all','<path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9" class="arc-o"/><path d="M4.5 12a7.5 7.5 0 0 1 13.2-4.9"/><path d="M18.4 3.6v3.8h-3.8"/><path d="M5.6 20.4v-3.8h3.8" class="arc-o"/>']
  };
  const miniIcon=n=>MINI[n]?`<svg class="esf-mini ${MINI[n][0]}" viewBox="0 0 24 24" aria-hidden="true">${MINI[n][1]}</svg>`:"";

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
  const TYPE_IC={"Tutorial": "analisis", "Infografía": "graficas", "Base de datos": "datos", "Dilo en ciencia": "comunidad", "Guía": "mapas", "Material didáctico": "comunidad", "Nota técnica": "analisis", "Informe": "graficas", "Capa geográfica": "mapas"};
  function cardHTML(o,extra){
    const fig=o.img?`<img src="${o.img}" alt="" loading="lazy">`:`<canvas data-pal="${o.pal}" aria-hidden="true"></canvas>`;
    return `<article class="card${o.href?" has-link":""}"${o.id?` id="${o.id}"`:""}><div class="fig">${fig}<span class="credit">${o.credit||"Ilustración de maqueta"}</span></div>
    <div class="body"><span class="card-ic" aria-hidden="true">${ICONS[o.ic||TYPE_IC[o.type]]||""}</span><div class="meta"><span class="pill ${o.cls}">${o.type}</span>${extra||""}</div><h3>${o.href?`<a href="${o.href}">${o.title}</a>`:o.title}</h3><p>${o.text}</p></div></article>`;
  }
  function paintFigs(root){root.querySelectorAll(".fig canvas").forEach((c,i)=>drawFig(c,c.dataset.pal,1.7+i*1.3));}


  const $=id=>document.getElementById(id);
  // Novedades
  const news=$("newsCards");
  if(news){news.innerHTML=NEWS.map(o=>cardHTML(o)).join("");}
  const escH=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const chipRow=(el,label,opts,key)=>{el.innerHTML=`<span class="chip-label">${label}</span>`+["Todos",...opts].map(o=>`<button class="chip" aria-pressed="${o==="Todos"}" data-${key}="${o}">${label==="Esfera"?miniIcon(o):""}${o}</button>`).join("");};
  const pressOne=(el,b)=>el.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b?"true":"false"));
  const typeGrid=(el,list)=>{el.innerHTML=list.map(([n,d,i])=>`<div class="type-item"><h3>${n}</h3><p>${d}</p><small>Ideal para: ${i}</small></div>`).join("");};
  const esfTags=e=>e.map(x=>`<span class="esf-tag">${miniIcon(x)}${x}</span>`).join("");

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
    chips.innerHTML=DISC.map(d=>`<button class="chip" aria-pressed="${d==="Todas"}" data-d="${d}">${d==="Todas"?"":miniIcon(d)}${d}</button>`).join("");
    const learn=x=>{
      const l=[];
      if(x.inf)l.push(`<a class="learn" href="aprende.html#${x.inf}"><span class="pill blue">Infografía</span>${esc(TITLES[x.inf]||"")}</a>`);
      if(x.tut)l.push(`<a class="learn" href="aprende.html#${x.tut}"><span class="pill teal">Tutorial</span>${esc(TITLES[x.tut]||"")}</a>`);
      return l.length?`<div class="src-learn"><span class="eyebrow">Aprende a usarla</span>${l.join("")}</div>`:"";
    };
    const renderSrc=()=>{
      const s=q.value.trim().toLowerCase();
      const rows=SOURCES.filter(x=>(disc==="Todas"||x.esf.includes(disc))&&(!s||(x.org+x.inst+x.esf.join(" ")+x.what+x.fmt).toLowerCase().includes(s)));
      body.innerHTML=rows.length?rows.map(x=>`<article class="src-card" id="f-${x.id}"><span class="card-ic" aria-hidden="true">${ICONS[x.ic]||""}</span>
        <header><h3>${x.org}</h3><small>${x.inst}</small></header>
        <div class="src-esf">${x.esf.length===5?`<span class="esf-tag">${miniIcon("Todas")}Todas las esferas</span>`:x.esf.map(e=>`<span class="esf-tag">${miniIcon(e)}${e}</span>`).join("")}</div>
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
      contours(ctx,r.width,r.height,t,0.4,[-1.4,-1,-.6,-.2,.2,.6,1,1.4],i=>i===4?css("--teal"):i===1?"rgba(193,98,16,.32)":i===6?"rgba(127,123,208,.42)":css("--contour"),10);
    };
    const loop=now=>{drawTopo(now);if(!reduce)requestAnimationFrame(loop);};
    requestAnimationFrame(loop);
  }

  // Artículo del mes: fondo "dosel" (luz que se filtra entre las hojas), solo en esta página
  const dosel=$("dosel");
  if(dosel){
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
    const SP=Array.from({length:46},()=>({x:rnd(),y:rnd(),r:.02+rnd()*.07,p:rnd()*6.28,s:.3+rnd()*.7,k:rnd()<.3}));
    const LV=Array.from({length:9},()=>({x:rnd(),y:rnd(),a:rnd()*6.28,s:.6+rnd()*.6,z:10+rnd()*10}));
    const leaf=(ctx,x,y,z,a)=>{ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.moveTo(-z,0);ctx.quadraticCurveTo(0,-z*.55,z,0);ctx.quadraticCurveTo(0,z*.55,-z,0);ctx.fill();ctx.restore();};
    const draw=now=>{
      const r=dosel.getBoundingClientRect();if(!r.width)return;
      const dpr=Math.min(2,window.devicePixelRatio||1);
      if(dosel.width!==Math.round(r.width*dpr)){dosel.width=r.width*dpr;dosel.height=r.height*dpr;}
      const ctx=dosel.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,r.width,r.height);
      const t=reduce?0:now/1000,M=Math.max(r.width,r.height),dark=matchMedia("(prefers-color-scheme: dark)").matches;
      SP.forEach(o=>{
        const x=(o.x+Math.sin(t*.05*o.s+o.p)*.02)*r.width,y=(o.y+Math.cos(t*.04*o.s+o.p)*.02)*r.height;
        const a=(.5+.5*Math.sin(t*.35*o.s+o.p));
        ctx.fillStyle=o.k?(dark?`rgba(244,211,94,${.04+.05*a})`:`rgba(244,211,94,${.10+.10*a})`):(dark?`rgba(167,201,87,${.03+.04*a})`:`rgba(255,255,255,${.30+.30*a})`);
        ctx.beginPath();ctx.arc(x,y,o.r*M*.5,0,Math.PI*2);ctx.fill();
      });
      ctx.fillStyle=dark?"rgba(106,153,78,.18)":"rgba(106,153,78,.16)";
      LV.forEach(o=>{
        const y=((o.y+t*.006*o.s)%1.1)-.05,x=o.x+Math.sin(t*.4*o.s+o.a)*.015;
        leaf(ctx,x*r.width,y*r.height,o.z,o.a+Math.sin(t*.5*o.s)*.5);
      });
    };
    const loopD=now=>{draw(now);if(!reduce)requestAnimationFrame(loopD);};
    requestAnimationFrame(loopD);
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

  // Figura de corrección: una lupa revisa un estante de libros, encuentra un error y lo corrige (dibujada en código)
  const fix=$("fixfig");
  if(fix){
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CYCLE=8000, t0=performance.now(), N=9, BAD=5;
    const ease=x=>x<0?0:x>1?1:x*x*(3-2*x);
    const BOOKS=[{h:.78,w:1,c:"--blue"},{h:.66,w:.8,c:"--teal"},{h:.84,w:1.1,c:"--ochre"},{h:.7,w:.9,c:"--blue"},{h:.62,w:.75,c:"--teal"},{h:.8,w:1,c:"--blue"},{h:.72,w:.9,c:"--ochre"},{h:.86,w:1.05,c:"--teal"},{h:.68,w:.85,c:"--blue"}];
    const font=s=>`500 ${s}px "IBM Plex Mono", ui-monospace, monospace`;
    const drawFix=now=>{
      const r=fix.getBoundingClientRect(); if(!r.width)return;
      const dpr=Math.min(2,window.devicePixelRatio||1), W=r.width, H=r.height;
      if(fix.width!==Math.round(W*dpr)){fix.width=W*dpr;fix.height=H*dpr;}
      const ctx=fix.getContext("2d");ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
      const t=reduce?CYCLE*0.5:(now-t0)%CYCLE, p=t/CYCLE;
      // estante
      const shelfY=H*0.82, left=W*0.06, right=W*0.94;
      const totalW=BOOKS.reduce((a,b)=>a+b.w,0), unit=(right-left)/(totalW+N*0.18);
      ctx.fillStyle=css("--line");ctx.fillRect(left-6,shelfY,right-left+12,5);
      const pos=[];let x=left;
      BOOKS.forEach((b,i)=>{const bw=b.w*unit,bh=b.h*(shelfY-H*0.12);pos.push({x,bw,bh});x+=bw+unit*0.18;});
      // fases: 0–45% la lupa recorre, 45–60% error detectado, 60–75% se corrige, 75–100% corregido
      const target=pos[BAD].x+pos[BAD].bw/2, start=pos[0].x+pos[0].bw/2;
      const lensX=start+(target-start)*ease(Math.min(1,p/0.45));
      const found=p>=0.45, fixing=p>=0.60, fixed=p>=0.75;
      const fixA=fixed?1:fixing?ease((p-0.60)/0.15):0;
      BOOKS.forEach((b,i)=>{
        const {x:bx,bw,bh}=pos[i], by=shelfY-bh;
        ctx.fillStyle=css(b.c);ctx.globalAlpha=0.9;ctx.fillRect(bx,by,bw,bh);ctx.globalAlpha=1;
        ctx.fillStyle="rgba(255,255,255,.55)";ctx.fillRect(bx+bw*0.2,by+bh*0.12,bw*0.6,2);ctx.fillRect(bx+bw*0.2,by+bh*0.18,bw*0.6,2);
        if(i===BAD&&found){
          const ey=by+bh*0.5;
          if(!fixed){ctx.globalAlpha=1-fixA;ctx.strokeStyle="#fff";ctx.lineWidth=2.4;const s=Math.min(bw*0.28,9);
            ctx.beginPath();ctx.moveTo(bx+bw/2-s,ey-s);ctx.lineTo(bx+bw/2+s,ey+s);ctx.moveTo(bx+bw/2+s,ey-s);ctx.lineTo(bx+bw/2-s,ey+s);ctx.stroke();ctx.globalAlpha=1;}
          if(fixA>0){ctx.globalAlpha=fixA;ctx.strokeStyle="#fff";ctx.lineWidth=2.4;const s=Math.min(bw*0.3,10);
            ctx.beginPath();ctx.moveTo(bx+bw/2-s,ey);ctx.lineTo(bx+bw/2-s*0.25,ey+s*0.7);ctx.lineTo(bx+bw/2+s,ey-s*0.8);ctx.stroke();ctx.globalAlpha=1;}
        }
      });
      // lupa
      const lr=Math.min(H*0.17,W*0.07), ly=H*0.42;
      const ring=found&&!fixed?css("--ochre"):fixed?css("--teal"):css("--ink");
      ctx.fillStyle="rgba(255,255,255,.18)";ctx.beginPath();ctx.arc(lensX,ly,lr,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=ring;ctx.lineWidth=3;ctx.beginPath();ctx.arc(lensX,ly,lr,0,Math.PI*2);ctx.stroke();
      ctx.lineWidth=5;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(lensX+lr*0.72,ly+lr*0.72);ctx.lineTo(lensX+lr*1.55,ly+lr*1.55);ctx.stroke();ctx.lineCap="butt";
      // leyendas
      ctx.font=font(Math.max(10,W*0.023));ctx.textAlign="center";
      if(found&&!fixed){ctx.globalAlpha=1-fixA*0.6;ctx.fillStyle=css("--ochre");ctx.fillText("Error detectado",lensX,ly-lr-10);ctx.globalAlpha=1;}
      if(fixed){ctx.fillStyle=css("--teal");ctx.fillText("Corregido · versión 1.1",lensX,ly-lr-10);}
      ctx.textAlign="left";ctx.fillStyle=css("--muted");ctx.font=font(Math.max(9,W*0.02));
      ctx.fillText(fixed?"versión 1.1":"versión 1.0",8,H-6);
    };
    const loopF=now=>{drawFix(now);if(!reduce)requestAnimationFrame(loopF);};
    requestAnimationFrame(loopF);
  }

  // Observar: un haz recorre un territorio y registra datos (dibujado en código)
  const obs=$("obscan");
  if(obs){
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0=performance.now();
    // puntos fijos (estaciones de observación), pseudoaleatorios pero estables
    const PTS=[];let s=7;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280;};
    for(let i=0;i<26;i++){const a=rnd()*Math.PI*2,r=Math.sqrt(rnd())*0.9;PTS.push({a,r,c:["--blue","--teal","--ochre"][i%3]});}
    const drawObs=now=>{
      const rc=obs.getBoundingClientRect(); if(!rc.width)return;
      const dpr=Math.min(2,window.devicePixelRatio||1), W=rc.width, R=W*0.46;
      if(obs.width!==Math.round(W*dpr)){obs.width=W*dpr;obs.height=W*dpr;}
      const ctx=obs.getContext("2d");ctx.setTransform(dpr,0,0,dpr,W/2*dpr,W/2*dpr);ctx.clearRect(-W/2,-W/2,W,W);
      ctx.save();ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.clip();
      // territorio: curvas de nivel
      ctx.translate(-W/2,-W/2);ctx.lineWidth=1;contours(ctx,W,W,0,2.3,[-1,-.5,0,.5,1],i=>i===2?css("--teal"):css("--contour"),9);
      ctx.restore();
      // anillos de alcance
      ctx.strokeStyle=css("--line");ctx.lineWidth=1;
      [0.33,0.66,1].forEach(k=>{ctx.beginPath();ctx.arc(0,0,R*k,0,Math.PI*2);ctx.stroke();});
      ctx.beginPath();ctx.moveTo(-R,0);ctx.lineTo(R,0);ctx.moveTo(0,-R);ctx.lineTo(0,R);ctx.stroke();
      // haz giratorio
      const ang=reduce?-Math.PI/4:((now-t0)/1000)*0.9%(Math.PI*2);
      ctx.fillStyle=css("--blue");
      for(let k=0;k<14;k++){const a1=ang-0.95*(k+1)/14,a2=ang-0.95*k/14;ctx.globalAlpha=0.22*(1-k/14);ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,a1,a2+0.005);ctx.closePath();ctx.fill();}
      ctx.globalAlpha=1;
      ctx.strokeStyle=css("--blue");ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(ang)*R,Math.sin(ang)*R);ctx.stroke();
      // puntos: se encienden al pasar el haz y se desvanecen
      PTS.forEach(p=>{
        let d=(ang-p.a)%(Math.PI*2);if(d<0)d+=Math.PI*2;
        const life=reduce?0.6:Math.max(0,1-d/(Math.PI*1.6));
        const x=Math.cos(p.a)*p.r*R,y=Math.sin(p.a)*p.r*R;
        ctx.globalAlpha=0.18+life*0.82;ctx.fillStyle=css(p.c);ctx.beginPath();ctx.arc(x,y,2.4+life*2.2,0,Math.PI*2);ctx.fill();
        if(life>0.85){ctx.globalAlpha=(life-0.85)/0.15*0.5;ctx.strokeStyle=css(p.c);ctx.beginPath();ctx.arc(x,y,6+(1-life)*30,0,Math.PI*2);ctx.stroke();}
      });
      ctx.globalAlpha=1;
      ctx.strokeStyle=css("--blue");ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.stroke();
    };
    const loopO=now=>{drawObs(now);if(!reduce)requestAnimationFrame(loopO);};
    requestAnimationFrame(loopO);
  }

  // Menú y página actual
  const nav=$("mainNav"),menuBtn=$("menuBtn");
  const page=document.body.dataset.page;
  nav.querySelectorAll("a").forEach(a=>{if(a.dataset.p===page)a.setAttribute("aria-current","page");});
  menuBtn.addEventListener("click",()=>{const o=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",o);});

  // ---------- Tono visual (moodboard 2026-11): color por sección y movimiento en el texto ----------
  document.querySelectorAll("[data-ic]").forEach(e=>{if(ICONS[e.dataset.ic])e.innerHTML=ICONS[e.dataset.ic];});
  const latest=$("latest");
  if(latest){
    const L=[["Artículo del mes|fauna","Trepar, cavar y planear: las ardillas que conectan las esferas de la Tierra","articulo-mes.html","k-bio"],["Bitácora|comunidad","Lanzamiento del OMCT · 1 de enero de 2027 · en línea","bitacora.html","k-geo"],["Vinculación|analisis","¿Publicaste un artículo? Proponlo para el Artículo del mes","vinculacion.html#articulo","k-cri"]];
    const items=(h)=>L.map(([kk,t,u,c])=>{const [k,ic]=kk.split("|");return `<li class="${c}"><a href="${u}"${h?' tabindex="-1"':''}><span class="lt-ic">${ICONS[ic]}</span>${k} <i>${t}</i> <span aria-hidden="true">→</span></a></li>`;}).join("");
    latest.innerHTML=`<span class="lt-label">Lo último</span><div class="lt-view"><div class="track"><ul>${items(0)}</ul><ul aria-hidden="true">${items(1)}</ul></div></div>`;
  }
  (function(){
    const TONES=["t-blue","t-teal","t-ochre","t-lav"];
    document.querySelectorAll("main .hero, main .band").forEach((el,i)=>el.classList.add(TONES[i%TONES.length]));
    const ANIM=!window.__omctNoAnim&&"IntersectionObserver" in window&&matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if(!ANIM)return;
    document.documentElement.classList.add("anim");
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting)return;
      const t=e.target;t.classList.add("in");io.unobserve(t);
      if(t.classList.contains("rv"))setTimeout(()=>t.classList.remove("rv","in"),900+(+t.style.getPropertyValue("--d")||0)*80);
    }),{rootMargin:"0px 0px -6% 0px",threshold:.08});
    // 1. Títulos: palabra por palabra
    const split=h=>{
      let n=0;
      const walk=node=>[...node.childNodes].forEach(c=>{
        if(c.nodeType===3){
          const f=document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(p=>{
            if(!p)return;
            if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(p));return;}
            const w=document.createElement("span");w.className="w";w.textContent=p;w.style.setProperty("--i",n++);f.appendChild(w);
          });
          c.replaceWith(f);
        }else if(c.nodeType===1)walk(c);
      });
      walk(h);h.style.setProperty("--n",n);h.classList.add("split");io.observe(h);
    };
    document.querySelectorAll("main h1, main h2").forEach(split);
    // 2. Etiquetas: aparecen letra a letra, como una lectura de instrumento
    const ioE=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;ioE.unobserve(e.target);(e.target.__ey||[]).forEach(x=>x.classList.add("in"));}),{rootMargin:"0px 0px -6% 0px"});
    document.querySelectorAll("main .eyebrow").forEach(e=>{e.style.setProperty("--c",Math.max(6,e.textContent.trim().length));e.classList.add("tw");const p=e.parentElement;(p.__ey=p.__ey||[]).push(e);ioE.observe(p);});
    // 3. Bloques: entran escalonados
    const SEL=".door,.card,.sphere,.src-card,.panel,.fair>div,.steps li,.type-item,.event,.person,.principles>div,.aotm,.bita-strip,.launch,.ficha,.cite,.cronica,.am-forma,.am-q,.am-block";
    const seen=new Map();
    document.querySelectorAll(SEL).forEach(el=>{
      const k=el.parentElement;const i=seen.get(k)||0;seen.set(k,i+1);
      el.style.setProperty("--d",Math.min(i,6));el.classList.add("rv");io.observe(el);
    });
    // 4. Cifras: cuentan hacia su valor
    const ioN=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting)return;ioN.unobserve(e.target);
      const el=e.target,txt=el.dataset.final,m=txt.match(/\d[\d  ]*(?:\.\d+)?/);if(!m)return;
      const raw=m[0].trim(),dec=(raw.split(".")[1]||"").length,grp=/[  ]/.test(raw),val=parseFloat(raw.replace(/[  ]/g,""));
      const fmt=v=>{let s=v.toFixed(dec);if(grp){const [a,b]=s.split(".");s=a.replace(/\B(?=(\d{3})+(?!\d))/g," ")+(b?"."+b:"");}return s;};
      const pre=txt.slice(0,m.index),post=txt.slice(m.index+m[0].trimEnd().length),t0=performance.now(),D=1300;
      const step=now=>{const p=Math.min(1,(now-t0)/D),k=1-Math.pow(1-p,3);el.textContent=pre+fmt(val*k)+post;if(p<1)requestAnimationFrame(step);else el.textContent=txt;};
      requestAnimationFrame(step);
    }),{threshold:.6});
    document.querySelectorAll(".coords b,.cifras dt,[data-count]").forEach(el=>{el.dataset.final=el.textContent;ioN.observe(el);});
  })();


  // ---------- Artículo del mes: pestañas por esfera, lámina armada e índice ----------
  const tabs=document.querySelectorAll('.am-tablist [role="tab"]');
  if(tabs.length){
    const sel=t=>{tabs.forEach(x=>{const on=x===t;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1;$(x.getAttribute("aria-controls")).hidden=!on;});};
    tabs.forEach((t,i)=>{
      t.addEventListener("click",()=>sel(t));
      t.addEventListener("keydown",e=>{const d=e.key==="ArrowRight"?1:e.key==="ArrowLeft"?-1:0;if(!d)return;e.preventDefault();const n=tabs[(i+d+tabs.length)%tabs.length];sel(n);n.focus();});
    });
  }
  const lam=$("lam");
  if(lam){
    const dlg=$("lamDlg");
    lam.addEventListener("click",()=>{if(dlg&&dlg.showModal)dlg.showModal();else window.open(lam.querySelector("img").src,"_blank");});
    if(dlg)dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close();});
    if(document.documentElement.classList.contains("anim")){
      // Collage: la lámina se arma por piezas (recortes de la misma imagen, 1080 × 1440)
      const W=1080,H=1440,P=[[30,0,500,105,"translate(-40px,-34px) rotate(-7deg)"],[40,100,440,470,"translate(-70px,24px) scale(.55) rotate(-12deg)"],[450,50,620,420,"translate(70px,-24px) rotate(5deg)"],[400,420,680,960,"translate(90px,70px) rotate(7deg) scale(.9)"],[780,400,280,230,"translate(30px,-40px) rotate(14deg) scale(.6)"],[20,520,450,280,"translate(-80px,0) rotate(-6deg)"],[40,790,430,300,"translate(-80px,24px) rotate(5deg)"],[20,1120,740,250,"translate(0,70px) rotate(-4deg)"],[0,1330,1080,110,"translate(0,40px)"]];
      P.forEach(([x,y,w,h,f],k)=>{const d=document.createElement("span");d.className="lam-p";d.setAttribute("aria-hidden","true");
        const c=`inset(${y/H*100}% ${(W-x-w)/W*100}% ${(H-y-h)/H*100}% ${x/W*100}%)`;d.style.clipPath=c;d.style.webkitClipPath=c;
        d.style.transformOrigin=`${(x+w/2)/W*100}% ${(y+h/2)/H*100}%`;d.style.setProperty("--from",f);d.style.setProperty("--k",k);lam.insertBefore(d,lam.querySelector(".lam-zoom"));});
      lam.style.setProperty("--bd",(P.length*160+300)+"ms");
      const lio=new IntersectionObserver(es=>{if(es[0].isIntersecting){setTimeout(()=>lam.classList.add("on"),150);lio.disconnect();}},{threshold:.3});lio.observe(lam);
      const rp=$("lamReplay");if(rp)rp.addEventListener("click",()=>{lam.classList.remove("on");setTimeout(()=>lam.classList.add("on"),500);});
    }
  }
  const amIdx=$("amIndex");
  if(amIdx&&"IntersectionObserver" in window){
    const links=[...amIdx.querySelectorAll("a")];
    const iio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.setAttribute("aria-current",a.hash==="#"+e.target.id?"true":"false"));}),{rootMargin:"-30% 0px -60% 0px"});
    links.forEach(a=>{const t=document.getElementById(a.hash.slice(1));if(t)iio.observe(t);});
  }

  paintFigs(document);
  let rz;window.addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>paintFigs(document),200);});
})();
