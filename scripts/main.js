
document.querySelectorAll('[data-src]').forEach(async (slot) => {
  const res = await fetch(slot.dataset.src);
  slot.innerHTML = await res.text();
});