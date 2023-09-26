const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");

function display() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((cartItem) => {
        const itemHTML = `
            <div class="cart-item d-flex justify-content-between">
                <div>
                    <h5>${cartItem.name}</h5>
                    <p>Price: ZAR ${cartItem.price.toFixed(2)}</p>
                    <p>Quantity: ${cartItem.Quantity}</p>
                </div>
                <div>
                    <button class="btn btn-danger" onclick="removePizzaFromCart('${cartItem.name}')">Delete</button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });
}

function updatePizzaQuantity(index) {
    if (index >= 0 && index < cart.length) {
        cart[index].Quantity ++;
    }
}

function calculateTotalItems() {
    const totalItemsElement = document.getElementById("total-items");
    const totalItems = cart.reduce((acc, item) => acc + item.Quantity, 0);
    totalItemsElement.textContent = totalItems;
}

function calculateTotalPrice() {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.Quantity, 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function removePizzaFromCart(pizzaName) {
    console.log(pizzaName);
    const index = cart.findIndex((item) => item.name == pizzaName);

    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        calculateTotalItems();
        calculateTotalPrice();
        display();
    }
}


const totalPriceElement = document.getElementById("total-price");



document.addEventListener("DOMContentLoaded", calculateTotalItems);
document.addEventListener("DOMContentLoaded", calculateTotalPrice);
document.addEventListener("DOMContentLoaded", display);
