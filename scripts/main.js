document.querySelectorAll('[data-src]').forEach(async (slot) => {
  let src = slot.dataset.src;

  const isInTemplates = window.location.pathname.includes('/templates/');
  if (isInTemplates && src.startsWith('src/')) {
    src = '../' + src;
  }

  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`Failed to load SVG: ${res.status}`);
    slot.innerHTML = await res.text();
  } catch (err) {
    console.error(`Error loading SVG from ${src}:`, err);
  }
});