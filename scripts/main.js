// Unique SVG artwork per theme
const THEME_ARTWORK = {
  sky: {
    bg: "var(--sky)",
    headerSvg: `
      <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMax slice">
        <rect width="1400" height="900" fill="#4E85B2"/>
        <path d="M100,220 C150,175 260,175 295,225 C365,195 430,250 390,295 C450,305 435,355 365,355 L120,355 C45,355 35,300 90,285 C35,270 55,220 100,220 Z" fill="#F3ECDD"/>
        <path d="M0,600 C260,555 460,610 700,570 C940,530 1120,585 1400,545 L1400,900 L0,900 Z" fill="#93A45C"/>
        <path d="M0,700 C280,665 540,715 800,675 C1040,635 1220,685 1400,660 L1400,900 L0,900 Z" fill="#D97848"/>
      </svg>`,
    footerSvg: `
      <svg viewBox="0 0 1400 260" preserveAspectRatio="xMidYMax slice">
        <rect width="1400" height="260" fill="#93A45C"/>
        <path d="M0,90 C260,60 540,105 800,75 C1040,48 1220,90 1400,70 L1400,260 L0,260 Z" fill="#D97848"/>
      </svg>`
  },
  lava: {
    bg: "var(--lava)",
    headerSvg: `
      <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMax slice">
        <rect width="1400" height="900" fill="#C4472A"/>
        <!-- Jagged volcanic peaks -->
        <polygon points="0,900 200,450 450,900" fill="#2B2A23"/>
        <polygon points="350,900 700,380 1000,900" fill="#3E3A30"/>
        <!-- Molten flow base -->
        <path d="M0,720 C350,680 650,780 1400,700 L1400,900 L0,900 Z" fill="#D97848"/>
      </svg>`,
    footerSvg: `
      <svg viewBox="0 0 1400 260" preserveAspectRatio="xMidYMax slice">
        <rect width="1400" height="260" fill="#C4472A"/>
        <path d="M0,100 C400,160 800,80 1400,120 L1400,260 L0,260 Z" fill="#2B2A23"/>
      </svg>`
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Build Header
  const header = document.getElementById("header-placeholder");
  if (header) {
    fetch("header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;

        const themeKey = header.dataset.theme || "sky";
        const config = THEME_ARTWORK[themeKey] || THEME_ARTWORK.sky;

        header.style.background = config.bg;
        header.querySelector(".svg-container").innerHTML = config.headerSvg;
        header.querySelector("#masthead-h1").textContent = header.dataset.title || "";
        header.querySelector("#masthead-p").textContent = header.dataset.desc || "";
      });
  }

  // 2. Build Footer
  const footer = document.getElementById("footer-placeholder");
  if (footer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => {
        footer.innerHTML = html;

        const themeKey = footer.dataset.theme || "sky";
        const config = THEME_ARTWORK[themeKey] || THEME_ARTWORK.sky;

        footer.style.background = config.bg;
        footer.querySelector(".svg-container").innerHTML = config.footerSvg;
      });
  }
});