/* app.js
   Lógica JavaScript separada.
   Comentado por secciones para que sepas qué hace cada bloque.
   - Contiene arrays de datos (12 nacionales, 8 internacionales).
   - Renderiza tarjetas y widgets dinámicamente.
   - Controla carruseles, búsqueda y formulario.
*/

// *************************************************************************** MENÚ MÓVIL ***********************************************************************************************
const menuButton = document.querySelector('button.md\\:hidden');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('hidden'); // alterna visibilidad
});



/****************************************************************** 1. Datos (fuente única para las vistas) ****************************************************************************/

/* ------------------------------------------------------------------------------------ NACIONALES -----------------------------------------------------------------------------------*/
/* nationalDestinations: 12 entradas — se inyectan en #nationalDestinationsContainer */
const nationalDestinations = [
  { id: 'quito', name: 'Quito', description: 'Capital cultural con historia andina.', images: ['img/Nacionales/Quito/Quito/240_F_272722761_mVm4YFP8zcKFSMRl5wzd2JN6pxR5Euiq.jpg','img/Nacionales/Quito/Quito/240_F_288037443_jfikXZxiqXcq00vVy2JRGy8pwTazUNN3.jpg','img/Nacionales/Quito/Quito/240_F_467941870_DSiA8F0YRlIMSQy1Fw5Uf0D6Vn4jP2NB.jpg'] },
  { id: 'galapagos', name: 'Galápagos', description: 'Vida salvaje única y volcanes.', images: ['img/Nacionales/Galápagos/Galápagos/240_F_80903735_FMSO0GQCl9EZlVHDEMCTJ4TYTcqvrsRw.jpg','img/Nacionales/Galápagos/Galápagos/240_F_1516849269_nGTW2YOVVLbIFtfFKuJZ287JNnXsOhSp.jpg','img/Nacionales/Galápagos/Galápagos/240_F_223471571_zm4KiEeNv7YMaCPcp7HXdWthYXosgU9V.jpg'] },
  { id: 'cuenca', name: 'Cuenca', description: 'Arquitectura colonial y arte.', images: ['img/Nacionales/Cuenca/Cuenca/240_F_187650593_1CqH15jREjqpS2ULzrdfJbavx2cTY4NQ.jpg','img/Nacionales/Cuenca/Cuenca/240_F_477227876_tq1ZnWkvROjAzFw0DavNdQCzJFU3g92T.jpg','img/Nacionales/Cuenca/Cuenca/240_F_533555387_EmMUlBUSa2TbpqM12B2oFTHdLHYs4ZjW.jpg'] },
  { id: 'guayaquil', name: 'Guayaquil', description: 'Puerto principal y Malecón 2000.', images: ['img/Nacionales/Guayaquil/Guayaquil/istockphoto-1254782629-612x612.jpg','img/Nacionales/Guayaquil/Guayaquil/unnamed.jpg','img/Nacionales/Guayaquil/Guayaquil/240_F_248350310_iWsCc5jsveQUHSk7KOATjsMGemmcbqbA.jpg'] },
  { id: 'banos', name: 'Baños', description: 'Aventura, cascadas y termas.', images: ['img/Nacionales/Baños/Baños/240_F_171228695_GtHkGayO9wi3nTHimtaWn3ft9WANCqQI.jpg','img/Nacionales/Baños/Baños/240_F_278582682_r9wokZcAvRNVuYMnv68poefLQkWNHXzy.jpg','img/Nacionales/Baños/Baños/240_F_839658957_o6ucIZaIrdJWl5kRuASvVaaueed5jG28.jpg'] },
  { id: 'mindo', name: 'Mindo', description: 'Bosque nublado y mariposas.', images: ['img/Nacionales/Mindo/Mindo/240_F_86520188_Ser8OzJWcHC90gbxfWsinaSR7EB4rEpA.jpg','img/Nacionales/Mindo/Mindo/240_F_94417223_RspsrJtXxni4urZDLYMBIXqquie5srLA.jpg','img/Nacionales/Mindo/Mindo/240_F_427566588_qK8JhmW5Ljp5SLZQOJeWviVpBK7EYteF.jpg'] },
  { id: 'otavalo', name: 'Otavalo', description: 'Mercado indígena y tejidos andinos.', images: ['img/Nacionales/Otavalo/Otavalo/images.jpg','img/Nacionales/Otavalo/Otavalo/ota-ban.jpg','img/Nacionales/Otavalo/Otavalo/day-1-Otavalo-marketplace-culture-1.webp'] },
  { id: 'spondylus', name: 'Ruta Spondylus', description: 'Playas y pueblos costeros.', images: ['img/Nacionales/Ruta spondylus/Ruta spondylus/San-Pablo-Santa-Elena.jpg','img/Nacionales/Ruta spondylus/Ruta spondylus/Ruta-Spondylus-Ecuador.webp','img/Nacionales/Ruta spondylus/Ruta spondylus/Ruta-del-Spondylus-Ecuador.jpg'] },
  { id: 'riobamba', name: 'Riobamba', description: 'Chimborazo y Tren Nariz del Diablo.', images: ['img/Nacionales/Riobamba/Riobamba/cca652dc156a7d628b5b67c4c459d103.jpg','img/Nacionales/Riobamba/Riobamba/tren-de-la-libertad-tour.jpg','img/Nacionales/Riobamba/Riobamba/b1fc6ad1e68176f20d16112b82fcc533_xl.jpg'] },
  { id: 'amazonia', name: 'Amazonía', description: 'Selva, biodiversidad y cultura nativa.', images: ['img/Nacionales/Amazonia/Amazonia/AdobeStock_1042605634-1024x574.webp','img/Nacionales/Amazonia/Amazonia/Amazon-Ecuador-_-Future-image.jpg','img/Nacionales/Amazonia/Amazonia/b7b22f4672.jpg'] },
  { id: 'loja', name: 'Loja', description: 'Música, cultura y valles fértiles.', images: ['img/Nacionales/loja/loja/Zapotillo.jpg','img/Nacionales/loja/loja/LOJA-EXPERIENCIAS-TURISTAS-ECUADOR-TRAVEL-002.jpg','img/Nacionales/loja/loja/loja_perfil_del_visitante_0.png'] },
  { id: 'machala', name: 'Machala', description: 'Capital bananera y cercanía a la costa sur.', images: ['img/Nacionales/Machala/Machala/36DC7964-0D4D-4AA9-9F47-B7688D08E2A8.jpeg','img/Nacionales/Machala/Machala/oro-verde-machala-hospedaje-1.jpg','img/Nacionales/Machala/Machala/parque juan montalvo.jpg'] }
];

/* ------------------------------------------------------------------------------------ INTERNACIONALES -----------------------------------------------------------------------------------*/
/* internationalDestinations: 8 entradas */
const internationalDestinations = [
  { id: 'ny', name: 'Nueva York', description: 'Metrópolis vibrante, cultura y rascacielos.', images: ['img/Internacionales/New York/New York/istockphoto-1454217037-612x612.jpg','img/Internacionales/New York/New York/manhattan-skyline_649448-1559.avif','img/Internacionales/New York/New York/premium_photo-1697730150275-dba1cfe8af9c.jpg'] },
  { id: 'egipto', name: 'Egipto', description: 'Pirámides, faraones y el Río Nilo.', images: ['img/Internacionales/Egipto/Egipto/istockphoto-1434687699-612x612.jpg','img/Internacionales/Egipto/Egipto/istockphoto-1464998966-612x612.jpg','img/Internacionales/Egipto/Egipto/2416567.jpg'] },
  { id: 'canada', name: 'Canadá', description: 'Naturaleza indómita, lagos y ciudades cosmopolitas.', images: ['img/Internacionales/Canada/Canada/alberta_canada_beautiful-Nature_HD_Wallpaper_1366x768.jpg','img/Internacionales/Canada/Canada/photo-1503614472-8c93d56e92ce.jpg','img/Internacionales/Canada/Canada/photo-1517935706615-2717063c2225.jpg'] },
  { id: 'grecia', name: 'Grecia', description: 'Cuna de la civilización, islas y mitología.', images: ['img/Internacionales/Grecia/Grecia/premium_photo-1661964149725-fbf14eabd38c.jpg','img/Internacionales/Grecia/Grecia/photo-1603565816030-6b389eeb23cb.jpg','img/Internacionales/Grecia/Grecia/grecia-uvj3x2nkk7sy1b84.jpg'] },
  { id: 'japon', name: 'Japón', description: 'Tradición y modernidad en perfecto contraste.', images: ['img/Internacionales/Japón/Japón/240_F_308881420_tJEyRLjzfELAgfN6tI0dL8HWeVpGLhW5.jpg','img/Internacionales/Japón/Japón/240_F_1643491037_UlEPzuN7kvommAfa6LCkyVq0gxBosBTk.jpg','img/Internacionales/Japón/Japón/240_F_244312786_qu8X7ywYQokjjvZssbjGsPzkVXQiLBE2.jpg'] },
  { id: 'italia', name: 'Italia', description: 'Arte, gastronomía y paisajes de ensueño.', images: ['img/Internacionales/Italia/Italia/240_F_62940517_t4SvTEyGkdeKS8BeYBkfs9l7bEx0VVaF.jpg','img/Internacionales/Italia/Italia/240_F_275590531_TNr4BtNNu0d4BV32wSEtjSPWfSnUb9mv.jpg','img/Internacionales/Italia/Italia/240_F_589506955_EljVLiVKWuJSjShm1qyIdfhc3nuyNQ70.jpg'] },
  { id: 'sudafrica', name: 'Sudáfrica', description: 'Safaris, montañas y culturas diversas.', images: ['img/Internacionales/Sudafrica/Sudafrica/240_F_234433426_BxTOEQGQVo7E9IxETMhazdDTiwC5aCvc.jpg','img/Internacionales/Sudafrica/Sudafrica/240_F_119731005_ZVwYRk1ufkDL87BLHRHR8ukrhSiSHVsh.jpg','img/Internacionales/Sudafrica/Sudafrica/240_F_746400716_hnoNu96GuN2se8C7RswLrGbVXb4JY8Hk.jpg'] },
  { id: 'Suiza', name: 'Suiza', description: 'Paisajes Alpinos y ciudades históricas.', images: ['img/Internacionales/Suiza/Suiza/Suiza+1.webp','img/Internacionales/Suiza/Suiza/96e9bf516fa10181417c715722c8db5e.jpg','img/Internacionales/Suiza/Suiza/C1A77B60-D29F-45A5-AE4B-E89083EC05AB-1024x768.jpg'] },
  { id: 'patagonia', name: 'Patagonia Austral', description: 'Glaciares, fiordos y aventura extrema.', images: ['img/Internacionales/Patagonia/Patagonia/240_F_287232432_vQZQCtyd5d7OF29TeF03KQa3DasaxjGi.jpg','img/Internacionales/Patagonia/Patagonia/240_F_293631966_dODsIDLVim972NxaxQUwZQheslIH1EyU.jpg','img/Internacionales/Patagonia/Patagonia/240_F_60669469_8jrucst3NQZI287gT4klwx7Ht9ZHvESu.jpg'] }
];

/* ----------------------------------------------------------------------- Videos (datos usados por render) ----------------------------------------------------------------------------*/
const videosData = [
  { id: 'video1', embedUrl: 'https://www.youtube.com/embed/zUu-fXIm_F8?si=sx7EZ1Ou7ZfV93zw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' },
  { id: 'video2', embedUrl: 'https://www.youtube.com/embed/Gb77y1Xpdtk?si=5SXYuCv2C9FA3JwE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' },
  { id: 'video3', embedUrl: 'https://www.youtube.com/embed/laiqbrG5y6I?si=8djq2ZjAJv4dTsIO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' },
  { id: 'video4', embedUrl: 'https://www.youtube.com/embed/TmDKbUrSYxQ?si=UDgZkXPxQ3FK_Yt8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' },
  { id: 'video5', embedUrl: 'https://www.youtube.com/embed/1_5n1EfcWyM?si=Pr38IERBGNjAAUa4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' }
];

/* -----------------------------------------------------------------  Testimonios (datos usados por render) -----------------------------------------------------------------------------*/
const testimonialsData = [
  { name: 'Andrea M.', quote: 'El viaje a Galápagos fue mágico. Todo perfectamente organizado y confiable. ¡Jevalia superó mis expectativas!', city: 'Quito' },
  { name: 'Javier P.', quote: 'Descubrir Japón con su itinerario fue una experiencia inolvidable. La atención al detalle es excelente.', city: 'Guayaquil' },
  { name: 'Laura G.', quote: 'Desde la cotización hasta el regreso, el servicio fue impecable. Recomiendo Jevalia para viajes internacionales.', city: 'Cuenca' },
  { name: 'Ricardo S.', quote: 'Los videos turísticos me inspiraron, y la realidad del viaje a Egipto fue aún mejor. ¡Gracias, Jevalia!', city: 'Loja' }
];

/* -----------------------------------------------------------------  Servicios (datos usados por render) -----------------------------------------------------------------------------*/
const servicesData = [
  { title: 'Asesoría Personalizada', description: 'Expertos en destinos nacionales e internacionales, 24/7.', icon: '<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20v-2c-.523 0-1.04-.311-1.238-.687M5 16h10M5 20h5a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2zm0-4a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2zm-2-4a2 2 0 012-2h4a2 2 0 012 2v1"></path></svg>' },
  { title: 'Paquetes Flexibles', description: 'Opciones que se ajustan a tu presupuesto y estilo de viaje.', icon: '<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2a3 3 0 000 6v-2.25c-3.379-1.385-6-4.59-6-8.25C6 4.975 8.621 2 12 2s6 2.975 6 6z"></path></svg>' },
  { title: 'Soporte 24/7', description: 'Tranquilidad total con asistencia durante todo tu viaje.', icon: '<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>' }
];



/*************************************************************************** 2. Estado / variables de control ****************************************************************************/


/*------------------------------------------ DESTINOS NACIONALES, INTERNACIONALES, VIDEO Y TESTIMONIOS →  Para rotaciones, carruseles e índices ----------------------------------------*/

let nationalRotationIntervals = {};       // map id -> intervalId
let internationalImageIndexes = {};      // map id -> current image index
let currentVideoIndex = 0;               // video slide index
let currentTestimonialIndex = 0;         // testimonial slide index

/*********************************************************************** 3. Buscador (filtro en tiempo real) ****************************************************************************/

function filterDestinations() {
 
  // Tomamos el término y filtrar ambos arrays por nombre/descripcion
  const term = (document.getElementById('searchInput').value || '').toLowerCase();

  // Nacionales
  const filteredNational = nationalDestinations.filter(d =>
    d.name.toLowerCase().includes(term) || d.description.toLowerCase().includes(term)
  );
  renderNationalDestinations(filteredNational);
  const nationalSection = document.getElementById('destinos_nacionales');
  if (filteredNational.length === 0 && term.length > 0) nationalSection.classList.add('hidden'); else nationalSection.classList.remove('hidden');

  // Internacionales
  const filteredInternational = internationalDestinations.filter(d =>
    d.name.toLowerCase().includes(term) || d.description.toLowerCase().includes(term)
  );
  renderInternationalDestinations(filteredInternational);
  const internationalSection = document.getElementById('destinos_internacionales');
  if (filteredInternational.length === 0 && term.length > 0) internationalSection.classList.add('hidden'); else internationalSection.classList.remove('hidden');
}

/* ------------------------------------------------------------- 4. Rotación de imágenes DESTINOS NACIONALES ----------------------------------------------------------------------- */

/* startRotation: inicia setInterval que cambia background-image del card */
function startRotation(id, images) {
  let index = 0;
  const card = document.getElementById('national-card-' + id);
  // limpiar intervalo previo por seguridad
  if (nationalRotationIntervals[id]) clearInterval(nationalRotationIntervals[id]);

  nationalRotationIntervals[id] = setInterval(() => {
    index = (index + 1) % images.length;
    if (card) {
      card.style.backgroundImage = `url('${images[index]}')`;
      card.setAttribute('data-current-index', index);
    }
  }, 3000); // cada 3s
}

/* stopRotation: detiene intervalo y vuelve a la primera imagen */
function stopRotation(id, firstImage) {
  clearInterval(nationalRotationIntervals[id]);
  delete nationalRotationIntervals[id];
  const card = document.getElementById('national-card-' + id);
  if (card) {
    card.style.backgroundImage = `url('${firstImage}')`;
    card.setAttribute('data-current-index', 0);
  }
}

/* ------------------------------------------------------------------ 5. Render: DESTINOS INTERNACIONALES ------------------------------------------------------------------------ */
/* renderNationalDestinations: inyecta tarjetas en #nationalDestinationsContainer */
function renderNationalDestinations(destinations) {
  const container = document.getElementById('nationalDestinationsContainer');
  container.innerHTML = ''; // limpiar antes de renderizar

  destinations.forEach(d => {
    // Construimos HTML de cada tarjeta. Escapamos comillas en JSON para atributos inline.
    const cardHtml = `
      <div id="national-card-container-${d.id}" class="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition duration-300 transform hover:scale-[1.02] cursor-pointer"
           onmouseover="startRotation('${d.id}', ${JSON.stringify(d.images).replace(/"/g,'&quot;')})"
           onmouseout="stopRotation('${d.id}', '${d.images[0]}')"
           ontouchstart="startRotation('${d.id}', ${JSON.stringify(d.images).replace(/"/g,'&quot;')})"
           ontouchend="stopRotation('${d.id}', '${d.images[0]}')">
        <div id="national-card-${d.id}" data-current-index="0" class="h-48 bg-cover bg-center transition-all duration-700" style="background-image:url('${d.images[0]}');"></div>
        <div class="p-4">
          <h3 class="text-xl font-bold text-primary mb-1">${d.name}</h3>
          <p class="text-gray-600 text-sm">${d.description}</p>
          <button class="mt-3 text-accent font-semibold text-sm hover:underline" onclick="alert('Solicitaste más detalles para ${d.name}')">Ver Paquetes &rarr;</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHtml);
  });
}

/* -------------------------------------------------------------------- 6. Internacional: micro-carrusel y render --------------------------------------------------------------------- */
/* navigateInternational: cambia índice y actualiza background-image del micro-carrusel */
function navigateInternational(id, direction) {
  const destination = internationalDestinations.find(d => d.id === id);
  if (!destination) return;

  if (!Number.isInteger(internationalImageIndexes[id])) internationalImageIndexes[id] = 0;
  let newIndex = internationalImageIndexes[id] + direction;
  const maxIndex = destination.images.length - 1;

  if (newIndex < 0) newIndex = maxIndex;
  else if (newIndex > maxIndex) newIndex = 0;

  internationalImageIndexes[id] = newIndex;
  const imageElement = document.getElementById(`international-image-${id}`);
  if (imageElement) imageElement.style.backgroundImage = `url('${destination.images[newIndex]}')`;
}

/* renderInternationalDestinations: inyecta tarjetas internacionales */
function renderInternationalDestinations(destinations) {
  const container = document.getElementById('internationalDestinationsContainer');
  container.innerHTML = '';

  destinations.forEach(d => {
    internationalImageIndexes[d.id] = 0;
    const cardHtml = `
      <div class="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
        <div class="relative h-64">
          <div id="international-image-${d.id}" class="h-full bg-cover bg-center transition-all duration-500" style="background-image:url('${d.images[0]}');"></div>
          <button onclick="navigateInternational('${d.id}', -1)" class="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-r-lg hover:bg-accent/80 transition duration-300">&lt;</button>
          <button onclick="navigateInternational('${d.id}', 1)" class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-l-lg hover:bg-accent/80 transition duration-300">&gt;</button>
        </div>
        <div class="p-4">
          <h3 class="text-2xl font-bold text-primary mb-2">${d.name}</h3>
          <p class="text-gray-600">${d.description}</p>
          <button class="mt-3 text-accent font-semibold hover:underline" onclick="alert('Solicitaste cotización para ${d.name}')">¡Quiero Viajar! &rarr;</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHtml);
  });
}

/* ----------------------------------------------------------------------- 7. Videos (carrusel) ------------------------------------------------------------------------------------- */
/* renderVideos: crea iframes y los añade a #videosContainer */
function renderVideos() {
  const container = document.getElementById('videosContainer');
  container.innerHTML = '';

  videosData.forEach(v => {
    const videoHtml = `
      <div id="${v.id}" class="flex-shrink-0" style="width:100%;">
        <div class="relative w-full h-[300px] sm:h-[500px] lg:h-[90vh]">
          <iframe id="iframe-${v.id}" width="100%" height="100%" src="${v.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full rounded-xl"></iframe>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', videoHtml);
  });

  showVideo(0); // posición inicial
}

/* showVideo: muestra el iframe seleccionado y "pausa" los demás reasignando src */
function showVideo(index) {
  currentVideoIndex = index;
  const container = document.getElementById('videosContainer');
  const totalVideos = videosData.length;

  // normalizar índice
  if (currentVideoIndex < 0) currentVideoIndex = totalVideos - 1;
  else if (currentVideoIndex >= totalVideos) currentVideoIndex = 0;

  // reasignar src: mantiene cargado solo el actual
  for (let i = 0; i < totalVideos; i++) {
    const iframe = document.getElementById(`iframe-${videosData[i].id}`);
    const originalSrc = videosData[i].embedUrl;
    if (iframe) iframe.src = (i === currentVideoIndex) ? originalSrc : (originalSrc + '&stop=1');
  }

  // desplazar contenedor mediante translateX (cada slide 100%)
  const offset = currentVideoIndex * 100;
  container.style.transform = `translateX(-${offset}%)`;
}
function changeVideo(direction) { showVideo(currentVideoIndex + direction); }

/* -------------------------------------------------------------------------------------- 8. Testimonios ----------------------------------------------------------------------------- */
function renderTestimonials() {
  const container = document.getElementById('testimonialsContainer');
  container.innerHTML = '';

  testimonialsData.forEach(t => {
    const html = `
      <div class="flex-shrink-0 w-full p-8 md:p-12">
        <blockquote class="text-xl md:text-2xl font-light italic mb-6">"${t.quote}"</blockquote>
        <div class="flex items-center justify-center">
          <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary font-bold mr-4">${t.name.charAt(0)}</div>
          <p class="font-semibold text-accent">${t.name}, <span class="font-normal text-white">${t.city}</span></p>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });

  showTestimonial(0);
}

function showTestimonial(index) {
  currentTestimonialIndex = index;
  const container = document.getElementById('testimonialsContainer');
  const total = testimonialsData.length;

  if (currentTestimonialIndex < 0) currentTestimonialIndex = total - 1;
  else if (currentTestimonialIndex >= total) currentTestimonialIndex = 0;

  container.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
}
function changeTestimonial(direction) { showTestimonial(currentTestimonialIndex + direction); }

/* --------------------------------------------------------------------------- 9. Servicios ------------------------------------------------------------------------------------------- */
function renderServices() {
  const container = document.getElementById('servicesContainer');
  container.innerHTML = servicesData.map(s => `
    <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-accent transition duration-300 hover:shadow-xl">
      <div class="mb-3 flex items-center">${s.icon}<h3 class="text-xl font-bold text-primary ml-3">${s.title}</h3></div>
      <p class="text-gray-600">${s.description}</p>
    </div>
  `).join('');
}

/* --------------------------------------------------------- 10. Formulario: manejo y mensaje de confirmación ----------------------------------------------------------------------- */
/* --------------------------------------------------------- 10. Formulario: manejo y mensaje de confirmación ----------------------------------------------------------------------- */
function handleFormSubmit(e) {
    e.preventDefault();

    // 1. Obtener y estructurar los valores del formulario
    const formData = {
        nombre: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('phone').value,
        destino: document.getElementById('destination').value || 'no especificado',
        fechaSalida: document.getElementById('departure-date').value,
        fechaRetorno: document.getElementById('return-date').value,
        adultos: parseInt(document.getElementById('adults').value),
        ninos: parseInt(document.getElementById('children').value),
        bebes: parseInt(document.getElementById('infants').value),
        comentarios: document.getElementById('comments').value
    };
    const totalViajeros = formData.adultos + formData.ninos + formData.bebes;
    const form = document.getElementById('travelForm');
    const formMessage = document.getElementById('formMessage');
    
    // 2. Enviar datos al servidor (Backend)
    fetch('/api/cotizar', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // ÉXITO: Mostrar mensaje de confirmación al usuario
            let messageContent = `
                <p class="font-bold text-xl mb-2">¡Gracias, ${formData.nombre}!</p>
                <p>Tu solicitud de cotización para <span class="font-semibold text-primary">"${formData.destino}"</span> ha sido recibida con éxito.</p>
                <p class="mt-2 text-sm text-gray-700">Detalles: ${totalViajeros} Viajeros (${formData.adultos} Adultos). Se guardó en la DB.</p>
                <p class="mt-1 text-sm text-gray-700">Pronto recibirás una propuesta en <span class="font-medium">${formData.email}</span>.</p>
            `;
            
            formMessage.className = 'mt-4 text-center text-sm font-medium transition duration-500 mb-6';
            formMessage.classList.add('text-primary', 'p-4', 'bg-accent/20', 'border-accent', 'border', 'rounded-xl', 'shadow-inner');
            formMessage.innerHTML = messageContent;

            form.reset();
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => formMessage.classList.add('hidden'), 8000);

        } else {
            // FALLO: Mostrar mensaje de error (si hay problemas de DB)
            alert('Error al guardar la cotización. Por favor, inténtalo de nuevo.');
            console.error('Error del servidor:', data.message);
        }
    })
    .catch(error => {
        // FALLO: Mostrar mensaje de error de red
        alert('Error de conexión con el servidor. Asegúrate de que el servidor (node app.js) esté corriendo.');
        console.error('Error de red o conexión:', error);
    });
}

/* -------------------- 11. Inicialización (DOMContentLoaded) -------------------- */
/* Render inicial y asignación de eventos */
document.addEventListener('DOMContentLoaded', () => {
  // Render inicial completo
  renderNationalDestinations(nationalDestinations);
  renderInternationalDestinations(internationalDestinations);
  renderServices();
  renderVideos();
  renderTestimonials();

  // Listener del formulario
  const formElement = document.getElementById('travelForm');
  if (formElement) formElement.addEventListener('submit', handleFormSubmit);

  // Ajustes en resize: recalcula transform translateX (opcional, mantiene coherencia)
  window.addEventListener('resize', () => {
    showVideo(currentVideoIndex);
    showTestimonial(currentTestimonialIndex);
  });
});

/************************ */
