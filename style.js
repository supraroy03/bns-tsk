/* =====================================================
   GLOBAL INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initNoticeBoard();
  initScrollProgress();
});


/* =====================================================
   1. MOBILE NAVIGATION
===================================================== */

function initNavigation() {

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("is-open");
  });
}


/* =====================================================
   2. SCROLL PROGRESS BAR
===================================================== */

function initScrollProgress() {

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = height > 0 ? scrollTop / height : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  });
}


/* =====================================================
   3. NOTICE BOARD (SEARCH + FILTER + SORT)
===================================================== */

function initNoticeBoard() {

  const noticeGrid = document.getElementById("noticeGrid");
  if (!noticeGrid) return; // prevents errors on other pages

  const searchInput = document.getElementById("noticeSearch");
  const filterSelect = document.getElementById("noticeFilter");
  const noResults = document.getElementById("noResults");

  let notices = Array.from(
    noticeGrid.querySelectorAll(".notice-card")
  );

  /* -----------------------------
     SORT BY DATE (Newest First)
  ------------------------------ */

  notices.sort((a, b) => {
    const dateA = new Date(a.dataset.date);
    const dateB = new Date(b.dataset.date);
    return dateB - dateA;
  });

  notices.forEach(card => noticeGrid.appendChild(card));


  /* -----------------------------
     FILTER FUNCTION
  ------------------------------ */

  function filterNotices() {

    const searchTerm = searchInput
      ? searchInput.value.toLowerCase()
      : "";

    const selectedCategory = filterSelect
      ? filterSelect.value
      : "all";

    let visibleCount = 0;

    notices.forEach(card => {

      const title = card.querySelector("h3").textContent.toLowerCase();
      const text = card.querySelector("p").textContent.toLowerCase();
      const category = card.dataset.category;

      const matchesSearch =
        title.includes(searchTerm) ||
        text.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }

    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  /* -----------------------------
     EVENT LISTENERS
  ------------------------------ */

  if (searchInput) {
    searchInput.addEventListener("input", filterNotices);
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", filterNotices);
  }

}