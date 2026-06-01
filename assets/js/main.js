// --------------------------------------------------
// main.JS — shared utilities for all pages
// --------------------------------------------------

// --------------------------------------------------
// CUSTOM CURSOR
// --------------------------------------------------
(function () {
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");
  if (!cursor || !cursorDot) return;

  const isTouchDevice = window.matchMedia(
    "(hover: none), (pointer: coarse), (max-width: 768px)"
  ).matches;

  if (isTouchDevice) {
    cursor.remove();
    cursorDot.remove();
    return;
  }

  document.addEventListener("mousemove", (e) => {
    cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
    cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
  });
})();

// --------------------------------------------------
// MOBILE SIDEBAR DRAWER
// --------------------------------------------------
(function () {
  const sidebar = document.querySelector(".sidebar");
  const topbar = document.querySelector(".topbar");
  if (!sidebar || !topbar) return;

  const menuButton = document.createElement("button");
  const closeButton = document.createElement("button");
  const overlay = document.createElement("div");

  sidebar.id ||= "mobileSidebar";

  menuButton.type = "button";
  menuButton.className = "mobile-menu-toggle";
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-controls", sidebar.id);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = '<i class="bx bx-menu" aria-hidden="true"></i>';

  closeButton.type = "button";
  closeButton.className = "sidebar-close";
  closeButton.setAttribute("aria-label", "Close navigation menu");
  closeButton.innerHTML = '<i class="bx bx-x" aria-hidden="true"></i>';

  overlay.className = "sidebar-overlay";
  overlay.setAttribute("aria-hidden", "true");

  topbar.prepend(menuButton);
  sidebar.prepend(closeButton);
  sidebar.after(overlay);

  function setSidebarOpen(isOpen) {
    sidebar.classList.toggle("is-open", isOpen);
    overlay.classList.toggle("is-visible", isOpen);
    document.body.classList.toggle("sidebar-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    overlay.setAttribute("aria-hidden", String(!isOpen));
  }

  menuButton.addEventListener("click", () => setSidebarOpen(true));
  closeButton.addEventListener("click", () => setSidebarOpen(false));
  overlay.addEventListener("click", () => setSidebarOpen(false));

  sidebar.querySelectorAll(".nav-item").forEach((navItem) => {
    navItem.addEventListener("click", () => setSidebarOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebarOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setSidebarOpen(false);
  });
})();
