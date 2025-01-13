const cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Quitar</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
}
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Tu carro está vacío",
            text: "Por favor agrega elementos para hacer el Checkout."
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Gracias por tu compra!",
            text: "tu compra se ha realizado con éxito."
        });
        cart.length = 0;
        renderCart();
    }
});