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
  document.addEventListener("mousemove", (e) => {
    cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
    cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
  });
})();