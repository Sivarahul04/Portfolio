/* ---------- tiny helpers ---------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* ---------- loading screen ---------- */
window.addEventListener("load", () => {
  const screen = $("#loading-screen");
  const mainIcon = $(".main-icon");
  const loadingText = $("#loading-text");
  const subIcons = $$(".sub-icons i");
  const designerText = $("#designer-text");

  // staggered reveal
  requestAnimationFrame(() => {
    mainIcon.classList.add("show-in");
    setTimeout(() => loadingText.classList.add("show-in"), 120);
    subIcons.forEach((el, i) => setTimeout(() => el.classList.add("show-in"), 240 + i * 90));
    setTimeout(() => designerText.classList.add("show-in"), 650);
  });

  // hide overlay
  setTimeout(() => screen.classList.add("hidden"), 1200);
});

/* ---------- mobile nav toggle ---------- */
const navToggle = $(".nav-toggle");
const navList = $(".ul-list");
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const show = !navList.classList.contains("show");
    navList.classList.toggle("show", show);
    navToggle.setAttribute("aria-expanded", String(show));
  });
  // close on link click (mobile)
  $$(".ul-list a").forEach(a => {
    a.addEventListener("click", () => {
      navList.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- scroll spy (active nav) ---------- */
const sections = $$("#home, #about, #project, #services, #contact");
const navItems = $$(".ul-list li");
const setActive = (id) => {
  navItems.forEach(li => li.classList.remove("active"));
  const li = $(`.ul-list a[href="#${id}"]`)?.parentElement;
  if (li) li.classList.add("active");
};
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: "-30% 0px -65% 0px", threshold: 0.01 });
sections.forEach(s => spy.observe(s));

/* ---------- accordion panels (about) ---------- */
$$(".btn-toggle").forEach(btn => {
  const id = btn.getAttribute("aria-controls");
  const panel = id ? document.getElementById(id) : null;
  if (!panel) return;
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });
});

/* ---------- reveal on scroll ---------- */
const revealEls = $$(".slide-in-left, .slide-in-right");
const revObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("revealed");
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
revealEls.forEach(el => revObs.observe(el));

/* ---------- smooth scroll for nav anchors ---------- */
$$('.ul-list a[href^="#"]').forEach(a => {
  a.addEventListener("click", (ev) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    ev.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  });
});

/* ---------- CTA buttons ---------- */
$(".btn-home1")?.addEventListener("click", () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

$(".btn-home2")?.addEventListener("click", () => {
  const path = "assets/SIVA_M_CV.pdf"; // change to your actual CV path
  fetch(path, { method: "HEAD" })
    .then(r => r.ok ? window.open(path, "_blank") : alert("CV not found. Please add it at assets/cv.pdf"))
    .catch(() => alert("CV not found. Please add it at assets/cv.pdf"));
});

/* ---------- contact form (demo) ---------- */
$("#contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  console.log("Contact form data:", data);
  e.target.reset();
  alert("Thanks! Your message has been sent.");
});
