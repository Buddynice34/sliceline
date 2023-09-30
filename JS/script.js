const cart = JSON.parse(localStorage.getItem("cart")) || [];


function formatPriceZAR(price) {
    return `R ${price.toFixed(2)}`;
}

function addToCart(menuItem) {
    const existingPizzaIndex = cart.findIndex((item) => item.name === menuItem.name);
    
    if (existingPizzaIndex !== -1) {
        console.log(cart[existingPizzaIndex]);
        // Pizza already exists in the cart, so increment its quantity
        cart[existingPizzaIndex].Quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        // Pizza is not in the cart, so add it with a quantity of 1
        cart.push(menuItem);
        
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCartDisplay(); // Update the cart display (optional)
    
}

function updateCartDisplay() {
    const cartItemCount = document.querySelector(".cart-item-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    var count = 0;
    cart.forEach(item => {
        count += item.Quantity;
    });
    cartItemCount.textContent = count.toString();
}



// Function to fetch and populate menu items from menu.json
async function fetchAndPopulateMenuItems() {
    try {
        const response = await fetch("JS/pizzas.json"); // Fetch the J

        const pizzaMenu = await response.json(); // Parse JSON data

        const menuItemsContainer = document.getElementById("menu-items");

        pizzaMenu.forEach((pizza, index) => {
            // Create a menu item container
            const menuItem = document.createElement("div");
            menuItem.classList.add("col", "menu-item");

            // Create the card element
            const card = document.createElement("div");
            card.classList.add("card", "mb-4");

            // Create the card body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            // Create the image element
            const image = document.createElement("img");
            image.src = pizza.image;
            image.classList.add("card-img-top");
            image.alt = pizza.name;

            // Create the card title
            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = pizza.name;

            // Create the card description
            const cardDescription = document.createElement("p");
            cardDescription.classList.add("card-description");
            cardDescription.textContent = pizza.description;

            // Create the price element
            const price = document.createElement("p");
            price.classList.add("card-text");
            const priceLabel = document.createElement("strong");
            priceLabel.classList.add("price-label");
            priceLabel.textContent = formatPriceZAR(pizza.price);
            price.appendChild(priceLabel);

            //C
            // Create the "Add to Cart" button
            const addToCartButton = document.createElement("button");
            addToCartButton.classList.add("btn", "btn-primary");
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.onclick = () => addToCart(pizza);

            // Append elements to build the card
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(price);
            cardBody.appendChild(addToCartButton);

            card.appendChild(image);
            card.appendChild(cardBody);

            menuItem.appendChild(card);

            // Append the menu item to the menu container
            menuItemsContainer.appendChild(menuItem);
        });
    } catch (error) {
        console.error("Error fetching and parsing JSON:", error);
    }
}

// Use DOMContentLoaded event to ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", fetchAndPopulateMenuItems);
document.addEventListener("DOMContentLoaded", updateCartDisplay);