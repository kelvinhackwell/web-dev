// ── CART BADGE ──
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("brewlab-cart") || "[]");
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = total;
}
updateCartBadge();

// ── HERO SLIDER ──
let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function goToSlide(n) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = n;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

setInterval(() => {
  goToSlide((current + 1) % slides.length);
}, 5000);

// ── HAMBURGER MENU ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// ── NEWSLETTER ──
function handleNewsletter(e) {
  e.preventDefault();
  alert("Thank you for subscribing! ☕");
  e.target.reset();
}

// ── NAVBAR SCROLL SHADOW ──
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.3)";
  } else {
    navbar.style.boxShadow = "none";
  }
});
