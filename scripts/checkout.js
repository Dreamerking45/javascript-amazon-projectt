import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import isSatSun from "./checkWeekend.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

import "../data/car.js"


async function loadPage() {
  try {
    //throw 'error1';

    await loadProductsFetch();

    await new Promise((resolve, reject)=>{
      loadCart(()=>{
        resolve();
        //reject();
      });
    })
  } catch (error) {
    console.error('Unexpected error. Please try again later')
  }
  renderOrderSummary();
  renderPaymentSummary();

}
loadPage()
/*

Promise.all([
  loadProductsFetch(), 
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value2');
    });
  })
]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
});


new Promise((resolve)=>{
  loadProducts(() => {
    resolve();
  })
}).then(()=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})


loadProducts(()=>{
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

  let today1 = dayjs();
  console.log(isSatSun(today1));
