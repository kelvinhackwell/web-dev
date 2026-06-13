// ── LOAD ORDER SUMMARY ──
function loadSummary() {
  const cart = JSON.parse(localStorage.getItem("brewlab-cart") || "[]");
  const container = document.getElementById("checkout-items");

  if (cart.length === 0) {
    container.innerHTML =
      '<p style="opacity:0.5;font-size:0.9rem;">No items in cart.</p>';
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="checkout-item">
      <span class="checkout-item-name">${item.name}</span>
      <span class="checkout-item-qty">x${item.qty}</span>
      <span class="checkout-item-price">$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `,
    )
    .join("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + 4.99;
  document.getElementById("co-subtotal").textContent =
    `$${subtotal.toFixed(2)}`;
  document.getElementById("co-total").textContent = `$${total.toFixed(2)}`;
}

// ── PAYMENT METHOD TOGGLE ──
document.querySelectorAll(".payment-option").forEach((option) => {
  option.addEventListener("click", () => {
    document
      .querySelectorAll(".payment-option")
      .forEach((o) => o.classList.remove("selected"));
    option.classList.add("selected");
    const val = option.querySelector("input").value;
    document.getElementById("card-fields").style.display =
      val === "card" ? "grid" : "none";
    document.getElementById("mpesa-fields").style.display =
      val === "mpesa" ? "grid" : "none";
    document.getElementById("paypal-fields").style.display =
      val === "paypal" ? "grid" : "none";
  });
});

// ── CARD NUMBER FORMATTING ──
document.getElementById("card-num")?.addEventListener("input", function () {
  this.value = this.value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
});

// ── EXPIRY FORMATTING ──
document.getElementById("expiry")?.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2");
});

// ── PLACE ORDER ──
function placeOrder() {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!firstName || !lastName || !email || !address) {
    alert("Please fill in all delivery details.");
    return;
  }

  document.getElementById("modal-overlay").style.display = "flex";
}

// ── CLEAR CART ──
function clearCart() {
  localStorage.removeItem("brewlab-cart");
}

loadSummary();
