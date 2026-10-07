document.addEventListener("DOMContentLoaded", () => {
  const subtotalEl = document.querySelector("[data-summary-subtotal]");
  const discountEl = document.querySelector("[data-summary-discount]");
  const deliveryEl = document.querySelector("[data-summary-delivery]");
  const totalEl = document.querySelector("[data-summary-total]");
  const cartEmptyMsg = document.getElementById("cart-empty");
  const checkoutBtn = document.getElementById("checkbtn");
  const cartCountBadge = document.querySelector("[data-cart-count]");

  const deliveryFee = 15.00; 
  const discountAmount = subtotalEl<200?20.00:35.00;

  function getCurrentUserCart() {
    const currentUserId = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (!currentUserId) return [];

    const user = users.find(u => String(u.id) === String(currentUserId));
    return user && user.cart ? user.cart : [];
  }

  function saveCurrentUserCart(newCart) {
    const currentUserId = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    const userIndex = users.findIndex(u => String(u.id) === String(currentUserId));
    if (userIndex !== -1) {
      users[userIndex].cart = newCart;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  function loadCart() {
    let cart = getCurrentUserCart();

    if (cartCountBadge) {
      cartCountBadge.textContent = cart.length;
    }

    if (cart.length === 0) {
      if (cartEmptyMsg) cartEmptyMsg.hidden = false;
      updateSummary(0);
      return;
    }

    if (cartEmptyMsg) cartEmptyMsg.hidden = true;

    let subtotal = 0;
    cart.forEach(item => {
      const price = parseFloat(item.pricePerUnit) || 0;
      const quantity = parseInt(item.qty) || 1;
      subtotal += price * quantity;
    });

    updateSummary(subtotal);
  }

  function updateSummary(subtotal) {
    const total = subtotal > 0 ? (subtotal - discountAmount + deliveryFee) : 0;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
    if (deliveryEl) deliveryEl.textContent = subtotal > 0 ? `$${deliveryFee.toFixed(2)}` : `$0.00`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  loadCart();

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      let cart = getCurrentUserCart();

      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      alert("Thank you and Enjoy your shopping and wait for delivery soon");

      saveCurrentUserCart([]);

      loadCart();
    });
  }
});