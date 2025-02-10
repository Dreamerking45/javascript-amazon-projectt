import { getProduct } from "./data/products.js";
import { formatCurrency } from "./scripts/utils/money.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}
function formatDate(timestamp) {
    const date = new Date(timestamp);

    //get month name
    const month = date.toLocaleString('en-US', { month: 'long'});
    const day = date.getUTCDate();
    const suffix = getOrdinalSuffix(day);

    return `${month} ${day}${suffix}`
}
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return 'th';
  switch(day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th'
  }
}
console.log(orders)

let ordersHTML = '';

orders.forEach((order)=>{
  
         ordersHTML+=`   
          <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
       `
       order.products.forEach((product)=>{
       let matchingProduct = getProduct(product.productId);
           `
           <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${product.estimatedDeliveryTime}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
           `
  })
})
console.log(ordersHTML)


  

document.querySelector('.js-orders-grid').innerHTML