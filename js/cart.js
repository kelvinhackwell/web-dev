// ── LOAD CART ──
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("brewlab-cart") || "[]");
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const emptyCart = document.getElementById("empty-cart");

  if (cart.length === 0) {
    cartItems.style.display = "none";
    cartSummary.style.display = "none";
    emptyCart.style.display = "block";
    return;
  }

  cartItems.style.display = "flex";
  cartSummary.style.display = "block";
  emptyCart.style.display = "none";

  const images = {
    "Morning Ritual Espresso":
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&q=80",
    "Sundown Filter Blend":
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&q=80",
    "Dark Soil Espresso":
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&q=80",
    "Golden Hour Filter":
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200&q=80",
    "Discovery Bundle":
      "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=200&q=80",
    "Monthly Roaster's Pick":
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&q=80",
  };

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${images[item.name] || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&q=80"}" alt="${item.name}"/>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="item-price">$${item.price.toFixed(2)} each</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="item-total">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    </div>
  `,
    )
    .join("");

  updateSummary(cart);
}

// ── UPDATE SUMMARY ──
function updateSummary(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// ── CHANGE QTY ──
function changeQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem("brewlab-cart") || "[]");
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("brewlab-cart", JSON.stringify(cart));
  updateCartBadge();
  loadCart();
}

// ── REMOVE ITEM ──
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("brewlab-cart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("brewlab-cart", JSON.stringify(cart));
  updateCartBadge();
  loadCart();
}

loadCart();
