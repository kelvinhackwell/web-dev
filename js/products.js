// ── ADD TO CART ──
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("brewlab-cart") || "[]");
  const existing = cart.find((i) => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("brewlab-cart", JSON.stringify(cart));
  updateCartBadge();
  showToast();
}

// ── TOAST ──
function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ── FILTER ──
function filterProducts(category, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".product-card").forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
