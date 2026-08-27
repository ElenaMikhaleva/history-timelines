document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-placeholder").innerHTML = data);

  fetch("footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer-placeholder").innerHTML = data);
});