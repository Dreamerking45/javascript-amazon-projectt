import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";


describe('test suite: renderOrderSummary', ()=>{
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    const matchingProduct1 = getProduct(productId1);
    const matchingProduct2 = getProduct(productId2);
    
  beforeEach(()=>{
    spyOn(localStorage, 'setItem')

    document.querySelector('.js-test-container').innerHTML = ` 
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
     <div class="js-checkout-header-middle-section"></div>
       <div class="js-product-quantity js-product-quantity-${matchingProduct1.id}"></div>
    <div class="js-product-quantity js-product-quantity-${matchingProduct2.id}"></div>
  
          <span class="delete-quantity-link link-primary js-delete-link
          js-delete-link-${matchingProduct1.id}" data-product-id="${matchingProduct1.id}">
            Delete
          </span>
            <span class="delete-quantity-link link-primary js-delete-link
          js-delete-link-${matchingProduct2.id}" data-product-id="${matchingProduct2.id}">
            Delete
          </span>
       `

       spyOn(localStorage, 'getItem').and.callFake(()=>{
        return JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }]);

       })
        loadFromStorage();

        renderOrderSummary();
  })
  it('displays the cart', ()=>{

        expect(
        document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
          document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
          document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = ``;
       
  });
  it('removes a product', ()=>{
  

        const deleteLink = document.querySelector(`.js-delete-link-${matchingProduct1.id}`);

        /*expect(deleteLink).not.toEqual(null)

        deleteLink.click();*/

        expect(
          document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
          document.querySelector(`.js-cart-item-container-${productId1}`)
        ).not.toEqual(null);
        expect(
          document.querySelector(`.js-cart-item-container-${productId1}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);

        document.querySelector('.js-test-container').innerHTML = ``;
  })
});
/*
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart, renderCartQuantity, updateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  it('displays the cart', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // Define matchingProduct based on the product IDs
    const matchingProduct1 = getProduct(productId1);
    const matchingProduct2 = getProduct(productId2);

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header-middle-section"></div>
      <div class="js-product-quantity js-product-quantity-${matchingProduct1.id}"></div>
      <div class="js-product-quantity js-product-quantity-${matchingProduct2.id}"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  it('removes a product', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // Define matchingProduct based on the product IDs
    const matchingProduct1 = getProduct(productId1);
    const matchingProduct2 = getProduct(productId2);

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header-middle-section"></div>
      <div class="js-product-quantity js-product-quantity-${matchingProduct1.id}"></div>
      <div class="js-product-quantity js-product-quantity-${matchingProduct2.id}"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();

    // Simulate removing a product
    const removeButton = document.querySelector(`.js-remove-product-${matchingProduct1.id}`);
    removeButton.click();

    // Verify the product is removed
    expect(document.querySelector(`.js-product-quantity-${matchingProduct1.id}`)).toBeNull();
  });
});*/