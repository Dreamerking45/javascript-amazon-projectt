import { orders } from "./orders.js";
import { getProduct, products, loadProductsFetch } from "./data/products.js";
import { updateCartQuantity, cart } from "./data/cart.js";
import { formatDate  } from "./orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
let currentOrder; 
let currentQuantity;
let currentDate;
const today = dayjs();
let orderTime;
let deliveryTime;

async function gettingProducts() {
  await loadProductsFetch();

  for (const order of orders) {
    if (order.id === orderId) {
      currentOrder = order;
      console.log(currentOrder)
      orderTime = dayjs(order.orderTime);

    }
  }

  const matchingProduct = getProduct(productId)
  console.log(matchingProduct)
  console.log(orders)

  for (const product of currentOrder.products) {
    if (product.productId === productId) {
      currentQuantity = product.quantity
      currentDate = product.estimatedDeliveryTime
      deliveryTime = dayjs(product.estimatedDeliveryTime)
      
    }
  }
   const percentageProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

   const trackingHTML = `
    <div class="main">
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatDate(currentDate)}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${currentQuantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${
            percentageProgress < 50 ? 'current-status' : ''
          }">
           Preparing
          </div>
          <div class="progress-label ${
            (percentageProgress >= 50 && percentageProgress < 100) ? 'current-status' : ''
          }">
            Shipped
          </div>
          <div class="progress-label ${
            percentageProgress >= 100 ? 'current-status' : ''
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentageProgress}%"></div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('.js-main').innerHTML = trackingHTML;
}
gettingProducts();

