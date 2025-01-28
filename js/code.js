const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCartToStorage();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage();
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
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
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
            title: "Tu carro está vacio",
            text: "Por favor agrega artículos para hacer el Checkout."
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Gracias!",
            text: "Tu compra se ha realizado con éxito."
        });
        cart.length = 0;
        saveCartToStorage();
        renderCart();
    }
});

function loadArtGallery() {
    fetch('./data/art-gallery.json')
        .then(response => response.json())
        .then(data => {
            const artGallery = document.getElementById("art-gallery");
            data.records.forEach(art => {
                const col = document.createElement("div");
                col.className = "col-md-4 mb-4";
                col.innerHTML = `
                    <div class="card">
                        <img src="${art.image}" class="card-img-top" alt="${art.title}">
                        <div class="card-body">
                            <h5 class="card-title">${art.title}</h5>
                            <p class="card-text">${art.description}</p>
                            <p class="card-text text-success">$${art.price}</p>
                            <button class="btn btn-primary" onclick="addToCart('${art.title}', ${art.price})">Add to Cart</button>
                        </div>
                    </div>
                `;
                artGallery.appendChild(col);
            });
        })
        .catch(error => console.error('Error loading art gallery data:', error));
}

renderCart();
loadArtGallery();
