const phone = "525531622061";

let products = [
    {
        id: 1,
        name: "Chrome x CT",
        price: 799,
        oldPrice: 899,
        images: ["images/chrome1.jpg", "images/chrome2.jpg"],
        description: "Gorra premium edición Chrome x CT."
    },
    {
        id: 2,
        name: "Screen Edition",
        price: 799,
        oldPrice: null,
        images: ["images/screen1.jpg", "images/screen2.jpg"],
        description: "Modelo exclusivo Screen edición limitada."
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    let product = products.find(p => p.id == id);
    cart.push(product);
    saveCart();
    alert("Producto agregado al carrito 🔥");
}

function goToProduct(id) {
    window.location.href = "product.html?id=" + id;
}

function loadProductPage() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    let product = products.find(p => p.id == id);

    if (!product) return;

    document.getElementById("title").innerText = product.name;
    document.getElementById("description").innerText = product.description;
    document.getElementById("price").innerText = "$" + product.price;

    let imgContainer = document.getElementById("images");

    product.images.forEach(img => {
        let image = document.createElement("img");
        image.src = img;
        imgContainer.appendChild(image);
    });

    document.getElementById("addBtn").onclick = () => addToCart(product.id);
}

function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let shipping = total >= 1500 ? 0 : 120;
    let finalTotal = total + shipping;

    let message = "🔥 Pedido Hat Drop 🔥%0A%0A";

    cart.forEach(item => {
        message += "- " + item.name + " $" + item.price + "%0A";
    });

    message += "%0ATotal: $" + total;
    message += "%0AEnvío: $" + shipping;
    message += "%0A💰 Total Final: $" + finalTotal;

    window.open(`https://wa.me/${phone}?text=${message}`);
}