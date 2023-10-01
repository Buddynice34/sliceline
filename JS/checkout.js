// Function to retrieve cart data from local storage
function getCartData() {
    const cartDataJSON = localStorage.getItem("cart");
    return JSON.parse(cartDataJSON) || [];
}

// Function to populate the "Ordered Pizzas" section
function populateOrderedPizzas(limit) {
    const orderedPizzasContainer = document.getElementById("ordered-pizzas");
    const cartData = getCartData();

    // Clear any existing content in the container
    orderedPizzasContainer.innerHTML = "";

    // Loop through cart items and display them up to the specified limit
    cartData.slice(0, limit).forEach((cartItem) => {
        const pizzaItem = document.createElement("div");
        pizzaItem.classList.add("pizza-list-item", "d-flex", "justify-content-between");
        
        const pizzaDetails = document.createElement("div");
        const pizzaName = document.createElement("h5");
        pizzaName.textContent = cartItem.name;
        const pizzaPrice = document.createElement("p");
        pizzaPrice.textContent = `Price: R ${cartItem.price.toFixed(2)}`;
        const pizzaQuantity = document.createElement("p");
        pizzaQuantity.textContent = `Quantity: ${cartItem.Quantity}`;
        
        pizzaDetails.appendChild(pizzaName);
        pizzaDetails.appendChild(pizzaPrice);
        pizzaDetails.appendChild(pizzaQuantity);
        
        pizzaItem.appendChild(pizzaDetails);
        orderedPizzasContainer.appendChild(pizzaItem);

    });

    // Check if there are more pizzas to show
    if (cartData.length > limit) {
        // Add a "Show More" button
        const showMoreButton = document.createElement("button");
        showMoreButton.classList.add("btn", "btn-secondary", "mt-3");
        showMoreButton.textContent = "Show More";
        showMoreButton.addEventListener("click", () => {
            // When the button is clicked, show all pizzas
            populateOrderedPizzas(cartData.length);
            // Remove the "Show More" button
            showMoreButton.remove();
            showLessButton.classList.remove("d-none");
            orderedPizzasContainer.appendChild(showLessButton);
        });
        orderedPizzasContainer.appendChild(showMoreButton);
    }

    const showLessButton = document.createElement("button");
        showLessButton.classList.add("btn", "btn-secondary", "mt-3", "d-none");
        showLessButton.textContent = "Show Less";
        
        showLessButton.addEventListener("click", () => {
            // When the "Show Less" button is clicked, show only the first `limit` pizzas
            populateOrderedPizzas(limit);
            // Hide the "Show Less" button and add the "Show More" button
            showLessButton.classList.add("d-none");
            orderedPizzasContainer.appendChild(showMoreButton);
        });

}

// Call the function to initially populate the "Ordered Pizzas" section with a limit

// Function to update the subtotal and VAT
function updateSubtotalAndVAT() {
    const cartData = getCartData();
    const subtotalElement = document.getElementById("subtotal-section");
    const vatElement = document.getElementById("vat-section");
    const totalElement = document.getElementById("total-section");
    const vatPercentage = 15; // South African VAT percentage

    // Calculate the subtotal
    const subtotal = cartData.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.Quantity;
    }, 0);

    // Calculate the VAT
    const vatAmount = (subtotal * vatPercentage) / 100;

    // Display the subtotal and VAT in the appropriate elements
    subtotalElement.textContent = `Subtotal: R ${subtotal.toFixed(2)}`;
    // You can also display the VAT amount if needed
    vatElement.textContent = `VAT (15%): R ${vatAmount.toFixed(2)}`;
    var total = subtotal + vatAmount;
    totalElement.textContent = `Total (including VAT): R ${total.toFixed(2)}`;
}

// Call the function to update the subtotal and VAT when the page loads
updateSubtotalAndVAT();

// Call the function to populate the "Ordered Pizzas" section
populateOrderedPizzas(3);
