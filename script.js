function formatPriceZAR(price) {
    return `R ${price.toFixed(2)}`;
}


// Function to fetch and populate menu items from menu.json
async function fetchAndPopulateMenuItems() {
    try {
        const response = await fetch("pizzas.json"); // Fetch the JSON file
        const pizzaMenu = await response.json(); // Parse JSON data

        const menuItemsContainer = document.getElementById("menu-items");

        pizzaMenu.forEach((pizza, index) => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");
            const menuItemHTML = `
                <div class="col">
                    <div class="card mb-4">
                        <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
                        <div class="card-body">
                            <h5 class="card-title">${pizza.name}</h5>
                            <p class="card-description">${pizza.description}</p>
                            <p class="card-text"><strong class="price-label">${formatPriceZAR(pizza.price)}</strong></p>
                            <button class="btn btn-primary"><i class='bx bx-cart'></i> Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            const image = document.createElement("img");
            image.src = pizza.image;
            image.alt = pizza.name;

            const name = document.createElement("h3");
            name.textContent = pizza.name;

            const description = document.createElement("p");
            description.textContent = pizza.description;

            menuItem.appendChild(image);
            menuItem.appendChild(name);
            menuItem.appendChild(description);

            menuItemsContainer.innerHTML += menuItemHTML;
        });
    } catch (error) {
        console.error("Error fetching and parsing JSON:", error);
    }
}

// Use DOMContentLoaded event to ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", fetchAndPopulateMenuItems);