import { cart, removeFromCart, updateQuantity, updateDeliveryOption, renderCartQuantity } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

document.addEventListener('DOMContentLoaded', ()=>{
  renderOrderSummary();
})

export function renderOrderSummary() {

  let cartSummaryHTML = '';
  let cartQuantity;

  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    if (!matchingProduct) {
      console.error("Current products", products)
    }

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

  cartSummaryHTML += ` 
    <div class="cart-item-container
    js-cart-item-container
    js-cart-item-container-${matchingProduct.id}">

      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
         ${matchingProduct.getprice()}
        </div>
        <div class="js-product-quantity
        js-product-quantity-${matchingProduct.id}">
          <span>
            Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-quantity-link" data-product-id ="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input">
          <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id ="${matchingProduct.id}">Save</span>

          <span class="delete-quantity-link link-primary js-delete-link
          js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
      ${deliveryOptionsHTML(matchingProduct, cartItem)} 
      </div>
    </div> 
  </div>
  `;
  renderCartQuantity()
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{

      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.
      priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=`  
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'Checked': ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
        `
    })
    return html
  };

  const orderSummaryElement =  document.querySelector('.js-order-summary');
  if (orderSummaryElement) {
    orderSummaryElement.innerHTML = cartSummaryHTML;
  } else {
    console.error('Order summary element not found')
  }
 

  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click', () => {

      const productId = link.dataset.productId;
      removeFromCart(productId);

      /*const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.remove();*/
      renderOrderSummary();
      renderCartQuantity();
      renderPaymentSummary();
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

      const editedInput = saveElement.querySelector('.js-quantity-input')

      const newQuantity = Number(editedInput.value);
      updateQuantity(productId, newQuantity);

      saveElement.classList.remove('is-editing-quantity')

      saveElement.querySelector('.quantity-label').innerText = newQuantity;
     
      renderCartQuantity();
      renderPaymentSummary();
      renderOrderSummary();
    
    
    });
  });
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  });
};