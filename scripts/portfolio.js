const root = document.documentElement;
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav-links");
const themeButton = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const year = document.querySelector("#current-year");

year.textContent = String(new Date().getFullYear());

function setTheme(theme, persist = true) {
  const isEnglish = root.lang === "en";
  root.dataset.theme = theme;
  const targetTheme = theme === "dark" ? (isEnglish ? "light" : "claro") : (isEnglish ? "dark" : "escuro");
  themeButton.setAttribute("aria-label", isEnglish ? `Switch to ${targetTheme} theme` : `Ativar tema ${targetTheme}`);
  themeButton.setAttribute("title", isEnglish ? "Toggle theme" : "Alternar tema");
  themeColor.setAttribute("content", theme === "dark" ? "#101b2a" : "#f4f5f1");
  if (persist) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme switching still works when storage is unavailable.
    }
  }
}

let savedTheme;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch {
  savedTheme = null;
}
setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark", false);

themeButton.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = navigation.querySelectorAll('a[href^="#"]');
if ("IntersectionObserver" in window) {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealItems = document.querySelectorAll(".reveal");
  if (!motionPreference.matches) {
    root.classList.add("js-motion");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
