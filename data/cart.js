export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  let selectedElement =  document.querySelector(`.js-quantity-selector-${productId}`).value;

  cart.forEach((cartItem)=>{
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += Number(selectedElement);
  } else {
    cart.push({
      productId,
      quantity: Number(selectedElement)
    });
  }
};