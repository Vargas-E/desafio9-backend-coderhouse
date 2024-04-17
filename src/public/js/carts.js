const cartContainer = document.getElementById("cartContainer");

if (cart.products.length == 0) {
  const card = document.createElement("div");
  card.classList.add("cartCard");
  card.innerHTML = `<div style="font-size: 1.3rem; text-align:center; margin: auto;">Your Cart is empty!!</div>`;
  cartContainer.appendChild(card);
} else {
  cart.products.forEach((product) => {
    const productData = product.product;

    const card = document.createElement("div");
    card.classList.add("cartCard");
    card.innerHTML = `<div class="cartCardTextContainer">
        <div>Producto: ${productData.title}</div>
        <div>Precio: $${productData.price}</div>
        <div>Cantidad: ${product.quantity}</div>
        </div>
        <div class="cartCardImageContainer"></div>`;

    const icon = document.createElement("button");
    icon.classList.add("deleteButtonCart");
    icon.innerHTML = "DEL";
    icon.addEventListener("click", () => {
      console.log(`Este boton tiene que borrar ${productData.title}`);
    });

    const cardAndIcon = document.createElement("div");
    cardAndIcon.classList.add("cardAndIcon");
    cardAndIcon.appendChild(card);
    cardAndIcon.appendChild(icon);
    cartContainer.appendChild(cardAndIcon);
  });
}
