/* ══════════════════════════════════
   NOVARA RESORT — script.js
══════════════════════════════════ */

/* ── Toast helper ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── Hamburger menu ── */
const hamburger = document.querySelector('.hamburger');
const navEl     = document.querySelector('nav');
if (hamburger && navEl) {
  hamburger.addEventListener('click', () => navEl.classList.toggle('open'));
}

/* ── Active nav link ── */
(function () {
  const links = document.querySelectorAll('nav ul li a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
})();

/* ── Lightbox (gallery page) ── */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img')?.src;
    if (lightbox && lightboxImg && src) {
      lightboxImg.src = src;
      lightbox.classList.add('open');
    }
  });
});
if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

/* ── Gallery filter ── */
function filterGallery(cat, btn) {
  document.querySelectorAll('.gallery-filter-btn, [onclick^="filterGallery"]').forEach(b => {
    b.classList.remove('btn-primary');
    b.classList.add('btn-outline');
  });
  btn.classList.remove('btn-outline');
  btn.classList.add('btn-primary');

  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

/* ── Contact form ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll be in touch soon.');
    contactForm.reset();
  });
}

/* ── Booking form ── */
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('🏨 Booking request received!');
    bookingForm.reset();
  });
}

/* ══════════════════════════════════
   LOGIN PAGE — Auth logic
   Uses localStorage to persist accounts.
══════════════════════════════════ */

/** Switch between Sign In / Create Account tabs */
function switchTab(tab) {
  const loginForm    = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  const tabLogin     = document.getElementById('tab-login');
  const tabRegister  = document.getElementById('tab-register');
  if (!loginForm) return;

  if (tab === 'login') {
    loginForm.style.display    = '';
    registerForm.style.display = 'none';
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    document.getElementById('login-error').textContent = '';
  } else {
    loginForm.style.display    = 'none';
    registerForm.style.display = '';
    tabLogin.classList.remove('active');
    tabRegister.classList.add('active');
    document.getElementById('reg-error').textContent = '';
  }
}

/** Sign In handler */
function handleLogin() {
  const name  = document.getElementById('login-name')?.value.trim();
  const pass  = document.getElementById('login-pass')?.value;
  const errEl = document.getElementById('login-error');

  if (!name || !pass) {
    errEl.textContent = 'Please enter your full name and password.';
    return;
  }

  const accounts = JSON.parse(localStorage.getItem('novara_accounts') || '{}');
  if (!accounts[name]) {
    errEl.textContent = 'No account found with that name. Please create one.';
    return;
  }
  if (accounts[name] !== pass) {
    errEl.textContent = 'Incorrect password. Please try again.';
    return;
  }

  // Success — store session and redirect
  sessionStorage.setItem('novara_user', name);
  showToast('Welcome back, ' + name + '! 🌿');
  setTimeout(() => { window.location.href = 'rooms.html'; }, 900);
}

/** Create Account handler */
function handleRegister() {
  const name   = document.getElementById('reg-name')?.value.trim();
  const pass   = document.getElementById('reg-pass')?.value;
  const pass2  = document.getElementById('reg-pass2')?.value;
  const errEl  = document.getElementById('reg-error');

  if (!name || !pass || !pass2) {
    errEl.textContent = 'Please fill in all fields.';
    return;
  }
  if (pass.length < 6) {
    errEl.textContent = 'Password must be at least 6 characters.';
    return;
  }
  if (pass !== pass2) {
    errEl.textContent = 'Passwords do not match.';
    return;
  }

  const accounts = JSON.parse(localStorage.getItem('novara_accounts') || '{}');
  if (accounts[name]) {
    errEl.textContent = 'An account with this name already exists. Please sign in.';
    return;
  }

  // Save account
  accounts[name] = pass;
  localStorage.setItem('novara_accounts', JSON.stringify(accounts));
  sessionStorage.setItem('novara_user', name);

  showToast('Account created! Welcome, ' + name + ' 🌿');
  setTimeout(() => { window.location.href = 'rooms.html'; }, 900);
}

/* Allow Enter key to submit on login/register forms */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const loginForm    = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  if (!loginForm) return;

  if (loginForm.style.display !== 'none') {
    handleLogin();
  } else if (registerForm && registerForm.style.display !== 'none') {
    handleRegister();
  }
});