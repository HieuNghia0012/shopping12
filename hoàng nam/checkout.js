document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");
    
    let total = 0;
    orderSummary.innerHTML = "";
    
    cart.forEach(item => {
        total += item.quantity * parseInt(item.price);
        orderSummary.innerHTML += `
            <p>${item.name} - ${item.quantity} x ${item.price} VND</p>
        `;
    });

    document.getElementById("total-price").innerText = total;
});

function processPayment() {
    alert("Thanh toán thành công!");
    localStorage.removeItem("cart");
    window.location.href = "checkout.html";
}
