document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  if (header) {
    fetch("../templates/header.html")
      .then(res => res.text())
      .then(html => {
        header.innerHTML = html;
        header.querySelector("#header-kicker").textContent = header.dataset.kicker || "";
        header.querySelector("#header-title").textContent = header.dataset.title || "";
        header.querySelector("#header-dek").textContent = header.dataset.dek || "";
      });
  }

  // Inject Footer
  const footer = document.getElementById("site-footer");
  if (footer) {
    fetch("../templates/footer.html")
      .then(res => res.text())
      .then(html => footer.innerHTML = html);
  }
});