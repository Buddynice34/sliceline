// Set the target date for the countdown (24 hours from now)
const targetDate = new Date("2023-10-01T10:00:00");
        

// Update the countdown every second
const countdownElement = document.getElementById("countdown");

function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        countdownElement.textContent = "Countdown expired";
        // You can add additional actions when the countdown expires
    } else {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }
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

updateCartDisplay()
updateCountdown();
setInterval(updateCountdown, 1000);
document.addEventListener("DOMContentLoaded", updateCartDisplay);