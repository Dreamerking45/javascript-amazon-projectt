import { getProduct, products, loadProductsFetch } from "./data/products.js";
import { formatCurrency } from "./scripts/utils/money.js";


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getUTCDate();
  const suffix = getOrdinalSuffix(day);
  return `${month} ${day}${suffix}`;
}

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) return 'th';
  switch(day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}
window.onload = async function() {
  await loadProductsFetch(); 

  console.log(orders);

  let ordersHTML = '';
  orders.forEach((order) => {
    let html = '';
    html += `   
      <div class="order-container">
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
        ${orderedProducts(order.id)}
      </div>
    `;
    ordersHTML += html;
  });

  async function orderedProducts(orderId) {
    let html2 = '';
    for (const order of orders) {
      if (orderId === order.id) {
        for (const product of order.products) {
          
         let matchingProduct = getProduct(product.productId)

          if (matchingProduct) {
            html2 += `
              <div class="order-details-grid">
                <div class="product-image-container">
                  <img src="${matchingProduct.image}">
                </div>
                <div class="product-details">
                  <div class="product-name">${matchingProduct.name}</div>
                  <div class="product-delivery-date">Arriving on: ${formatDate(product.estimatedDeliveryTime)}</div>
                  <div class="product-quantity">Quantity: ${product.quantity}</div>
                  <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </div>
                <div class="product-actions">
                  <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                    <button class="track-package-button button-secondary">Track package</button>
                  </a>
                </div>
              </div>
            `;
          }
        }
      }
    }
    return html2;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  });
}
