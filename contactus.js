const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

const messageEl = document.getElementById('message');
const charCount = document.getElementById('charCount');
messageEl.addEventListener('input', () => {
  charCount.textContent = messageEl.value.length;
});

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const successBox = document.getElementById('successBox');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();

  const phone = document.getElementById('phone');
  if (phone.value.trim() !== '' && !/^01[0-9]{9}$/.test(phone.value.trim())) {
    phone.setCustomValidity('invalid');
  } else {
    phone.setCustomValidity('');
  }

  if (!form.checkValidity()) {
    Array.from(form.elements).forEach(el => {
      if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
        el.classList.toggle('is-invalid', !el.checkValidity());
      }
    });
    form.classList.add('was-validated');
    return;
  }

  submitBtn.disabled = true;
  btnText.textContent = 'جارِ الإرسال...';
  successBox.classList.remove('show');

  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.textContent = 'إرسال الرسالة';
    successBox.classList.add('show');
    form.reset();
    form.classList.remove('was-validated');
    Array.from(form.elements).forEach(el => el.classList.remove('is-invalid'));
    charCount.textContent = '0';
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1400);
});

form.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => {
    if (form.classList.contains('was-validated')) {
      el.classList.toggle('is-invalid', !el.checkValidity());
    }
  });
});

