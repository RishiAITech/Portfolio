// Load HTML component (header / footer)
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const response = await fetch(file);
  el.innerHTML = await response.text();
  return el;
}

// Load header & footer
loadComponent("header", "../components/header.html").then(initHeader);
loadComponent("footer", "../components/footer.html");

function initHeader(header) {
  if (!header) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  header.querySelectorAll("[data-nav-link]").forEach((link) => {
    const linkPage = new URL(link.getAttribute("href"), window.location.href)
      .pathname
      .split("/")
      .pop();

    if (linkPage === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Mobile menu toggle (single, safe handler)
document.addEventListener("click", (e) => {
  const clickedElement = e.target instanceof Element ? e.target : null;
  const menuBtn = clickedElement?.closest("#menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn) {
    if (!mobileMenu) return;

    const isOpen = mobileMenu.classList.toggle("hidden") === false;
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    return;
  }

  if (!mobileMenu) return;

  if (clickedElement?.closest("#mobileMenu a")) {
    mobileMenu.classList.add("hidden");
    document.getElementById("menuBtn")?.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 1024) return;

  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.getElementById("menuBtn");

  mobileMenu?.classList.add("hidden");
  menuBtn?.setAttribute("aria-expanded", "false");
  menuBtn?.setAttribute("aria-label", "Open menu");
});
