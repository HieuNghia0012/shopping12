document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    loadCart();
});

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}" width="100">
                <h3>${product.name}</h3>
                <p>${product.price} VND</p>
                <button onclick="addToCart(${index})">🛒 Thêm vào giỏ</button>
            </div>
        `;
    });
}

function addToCart(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.name === products[index].name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...products[index], quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;

    let total = cart.reduce((sum, item) => sum + item.quantity * parseInt(item.price), 0);
    document.getElementById("total-price").innerText = total;

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    
    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div>
                <img src="${item.image}" width="50">
                <p>${item.name} - ${item.quantity} x ${item.price} VND</p>
                <button onclick="updateQuantity(${index}, -1)">➖</button>
                <button onclick="updateQuantity(${index}, 1)">➕</button>
                <button onclick="removeFromCart(${index})">❌</button>
            </div>
        `;
    });
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("hidden");
}

function checkout() {
    if (JSON.parse(localStorage.getItem("cart")).length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }
    window.location.href = "checkout.html";
}
