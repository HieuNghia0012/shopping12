document.addEventListener("DOMContentLoaded", loadProducts);

function showAddForm() {
    document.getElementById("add-product-form").classList.toggle("hidden");
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        productList.innerHTML += `
            <div>
                <img src="${product.image}" width="50">
                <p>${product.name} - ${product.price} VND</p>
                <button onclick="deleteProduct(${index})">❌ Xóa</button>
            </div>
        `;
    });
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    if (!name || !price || !image) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ name, price, image });
    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();
    alert("Thêm sản phẩm thành công!");
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}
