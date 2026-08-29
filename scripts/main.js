
document.querySelectorAll('[data-src]').forEach(async (slot) => {
  const res = await fetch(slot.dataset.src);
  slot.innerHTML = await res.text();
});

document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const captionEl = carousel.querySelector('.carousel-caption');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to image ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    captionEl.textContent = slides[index].dataset.caption || '';
  }

  carousel.querySelector('.carousel-prev').addEventListener('click', () => goTo(index - 1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => goTo(index + 1));

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) goTo(index - 1);
    else if (dx < -40) goTo(index + 1);
  });

  goTo(0);
});