/* ── Hamburger Menu ── */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  // Highlight active nav link
  const links = document.querySelectorAll('nav ul li a');
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'home.html')) {
      link.classList.add('active');
    }
  });
});

/* ── Toast Notification ── */
function showToast(msg) {
  let toast = document.getElementById('toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── Login Validation ── */
function handleLogin(e) {
  e.preventDefault();

  const user = document.getElementById('username')?.value.trim();
  const pass = document.getElementById('password')?.value;

  if (user === 'admin' && pass === '1234') {
    window.location.href = 'home.html';
  }
}

// /* ── Book Now Button ── */
// function handleBookNow() {
//   showToast('🌿 Redirecting to booking — thank you for choosing Novara!');
// }

/* ── Contact Form Validation ── */
function handleContact(e) {
  e.preventDefault();

  const name = document.getElementById('c-name')?.value.trim();
  const email = document.getElementById('c-email')?.value.trim();
  const subject = document.getElementById('c-subject')?.value.trim();
  const message = document.getElementById('c-message')?.value.trim();

  if (!name) {
    showToast('⚠️ Please enter your name.');
    return;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('⚠️ Please enter a valid email address.');
    return;
  }

  if (!subject) {
    showToast('⚠️ Please enter a subject.');
    return;
  }

  if (!message) {
    showToast('⚠️ Please write your message.');
    return;
  }

  showToast("✅ Message sent! We'll get back to you within 24 hours.");
  e.target.reset();
}

/* ── Gallery Lightbox ── */
function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');

  if (lb && img) {
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');

  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* Close lightbox on background click or ESC key */
document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');

  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});