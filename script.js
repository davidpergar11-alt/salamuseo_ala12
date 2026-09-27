/* =========================================================
   Museo del Ala 12 — script.js
   Interactividad: menú, dropdown, timeline, formulario, modal.
   Ajusta los datos de cada pieza en la const piezas.
   ========================================================= */

const pieces = {
  sabre: {
    title: 'Sala Sabre / F-104',
    subtitle: 'Pieza provisional — edición recomendada',
    image: 'assets/placeholder-aircraft.jpg',
    description: 'Descripción provisional de la sala. Sustituye este texto por la ficha de la pieza real o por una imagen autorizada.',
    technical: 'Características técnicas: completar con especificaciones verificadas.',
    history: 'Historia: completar con datos contrastados y no inventados.',
    gallery: [
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg'
    ]
  },
  f4: {
    title: 'Sala F-4C',
    subtitle: 'Pieza provisional — edición recomendada',
    image: 'assets/placeholder-aircraft.jpg',
    description: 'Descripción provisional para el conjunto expositivo de la sala F-4C.',
    technical: 'Modelo / motor / capacidad: completar con datos verificados.',
    history: 'Contexto histórico: añadir referencias fiables antes de publicar.',
    gallery: [
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg'
    ]
  },
  f18: {
    title: 'Sala F-18',
    subtitle: 'Pieza provisional — edición recomendada',
    image: 'assets/placeholder-aircraft.jpg',
    description: 'Ficha inicial para la exposición del F-18. Reemplazar por contenido real y autorizado.',
    technical: 'Datos técnicos: pendiente de verificación.',
    history: 'Historia: añadir referencias oficiales antes de publicar.',
    gallery: [
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg'
    ]
  },
  misc: {
    title: 'Sala Miscelánea',
    subtitle: 'Pieza provisional — edición recomendada',
    image: 'assets/placeholder-aircraft.jpg',
    description: 'Sección para objetos de apoyo, documentación y elementos auxiliares.',
    technical: 'Especificaciones: completar según el material real y verificable.',
    history: 'Contexto: añadir explicación histórica con fuentes fiables.',
    gallery: [
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg',
      'assets/placeholder-aircraft.jpg'
    ]
  }
};

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const dropdowns = document.querySelectorAll('.has-dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const timelineItems = document.querySelectorAll('.timeline-item');
const reviewForm = document.getElementById('review-form');
const reviewsContainer = document.getElementById('reviews-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
const openPieceButtons = document.querySelectorAll('.open-piece');

function setActiveNav(targetId) {
  navLinks.forEach(link => {
    const isActive = link.dataset.target === targetId;
    link.classList.toggle('active', isActive);
  });
}

function handleNavClick(e) {
  const link = e.currentTarget;
  const targetId = link.dataset.target;
  if (!targetId) return;
  setActiveNav(targetId);
  if (window.innerWidth <= 760) {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

navLinks.forEach(link => link.addEventListener('click', handleNavClick));

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const parent = dropdownToggle.parentElement;
    const isOpen = parent.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    const hasDropdown = event.target.closest('.has-dropdown');
    if (!hasDropdown) {
      document.querySelector('.has-dropdown')?.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

timelineItems.forEach(item => {
  const button = item.querySelector('.timeline-toggle');
  if (!button) return;

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    timelineItems.forEach(other => other.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

function showReview(name, text) {
  const card = document.createElement('article');
  card.className = 'review-item';
  card.innerHTML = `
    <strong>${escapeHtml(name)}</strong>
    <p>${escapeHtml(text)}</p>
  `;
  reviewsContainer.prepend(card);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('review-name');
    const reviewInput = document.getElementById('review-text');
    const name = nameInput.value.trim();
    const review = reviewInput.value.trim();

    if (!name || !review) {
      alert('Rellena nombre y reseña antes de enviar.');
      return;
    }

    showReview(name, review);
    reviewForm.reset();
    alert('Tu reseña se ha registrado en esta sesión. Para guardarla de forma permanente, integra un servicio externo o API.');
  });
}

function openPieceModal(roomKey) {
  const metadata = pieces[roomKey];
  if (!metadata) return;

  modalContent.innerHTML = `
    <div class="piece-header">
      <div>
        <h4>${metadata.title}</h4>
        <p class="dark-note">${metadata.subtitle}</p>
      </div>
    </div>

    <div class="piece-details">
      <div class="piece-image">
        <img src="${metadata.image}" alt="${metadata.title}" />
      </div>

      <div class="piece-info">
        <div class="piece-meta">
          <div>
            <strong>Descripción</strong>
            <span>${metadata.description}</span>
          </div>
          <div>
            <strong>Características técnicas</strong>
            <span>${metadata.technical}</span>
          </div>
          <div>
            <strong>Historia</strong>
            <span>${metadata.history}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="piece-gallery">
      ${metadata.gallery.map(src => `<img src="${src}" alt="Detalle de ${metadata.title}" />`).join('')}
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
}

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

openPieceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const roomKey = button.dataset.room;
    openPieceModal(roomKey);
  });
});

const radarCanvas = document.getElementById('radar-canvas');
if (radarCanvas) {
  const ctx = radarCanvas.getContext('2d');
  let angle = 0;
  function drawRadar() {
    const w = radarCanvas.width = radarCanvas.clientWidth * window.devicePixelRatio;
    const h = radarCanvas.height = radarCanvas.clientHeight * window.devicePixelRatio;
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, w, h);

    const centerX = radarCanvas.clientWidth / 2;
    const centerY = radarCanvas.clientHeight / 2;
    const radius = Math.min(radarCanvas.clientWidth, radarCanvas.clientHeight) * 0.42;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(107,197,255,0.45)';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    ctx.strokeStyle = 'rgba(107,197,255,0.9)';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.75, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(107,197,255,0.25)';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(107,197,255,0.25)';
    ctx.stroke();

    angle += 0.04;
    requestAnimationFrame(drawRadar);
  }

  requestAnimationFrame(drawRadar);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});
