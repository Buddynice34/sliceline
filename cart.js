const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");

cart.forEach((cartItem) => {
    const itemHTML = `
        <div class="cart-item">
            <h5>${cartItem.name}</h5>
            <p>Price: R ${cartItem.price.toFixed(2)}</p>
            <p>Quantity: ${cartItem.Quantity}</p>
        </div>
    `;
    cartItemsContainer.innerHTML += itemHTML;
});

function updatePizzaQuantity(index, newQuantity) {
    // Ensure the index is valid
    if (index >= 0 && index < cart.length) {
        // Update the quantity
        cart[index].quantity = newQuantity;
    }
    // Recalculate and update the total items and total price
    updateTotals();
    // Refresh the cart display
    displayCart();
}

function calculateTotalItems() {
    const totalItems = cart.reduce((acc, item) => acc + item.Quantity, 0);
    return totalItems;
}

function calculateTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.Quantity, 0);
    return totalPrice.toFixed(2); // Format the price with two decimal places
}

const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");

totalItemsElement.textContent = calculateTotalItems();
totalPriceElement.textContent = calculateTotalPrice();