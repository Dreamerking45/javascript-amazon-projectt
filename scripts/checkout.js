import { cart, removeFromCart, updateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"

let cartSummaryHTML = '';
let cartQuantity;

cart.forEach((cartItem)=>{
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product)=>{
    if (product.id === productId) {
      matchingProduct = product;
    } 
  });
cartSummaryHTML += ` 
  <div class="cart-item-container
  js-cart-item-container-${matchingProduct.id}">

  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-quantity-link" data-product-id ="${matchingProduct.id}">
          Update
        </span>
        <input class="quantity-input js-quantity-input">
        <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id ="${matchingProduct.id}">Save</span>

        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
 renderCartQuantity()
});
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

function renderCartQuantity() {
  cartQuantity = updateCartQuantity()
  document.querySelector('.js-checkout-header-middle-section')
  .innerHTML = `${cartQuantity} items`
  
}

document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
  link.addEventListener('click', () => {

    const productId = link.dataset.productId;
    removeFromCart(productId)

    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove();

    renderCartQuantity();
  })
})
document.querySelectorAll('.js-quantity-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    console.log(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  })
});
document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;
    console.log(productId);

    const saveElement = document.querySelector(`.js-cart-item-container-${productId}`);

    const editedInput = document.querySelector('.js-quantity-input')

    const newQuantity = Number(editedInput.value);
    updateQuantity(productId, newQuantity);

    saveElement.classList.remove('is-editing-quantity')

    renderCartQuantity();

    cart.forEach((cartItem)=>{
      if (cartItem.productId === productId) {
        document.querySelector('.js-quantity-label').innerHTML = cartItem.quantity;
      }
    });
  
  });
});