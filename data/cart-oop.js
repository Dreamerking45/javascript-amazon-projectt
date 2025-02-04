function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
     loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
    if (!this.cartItems) {
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
    },
    updateCartQuantity() {
      let cartQuantity = 0;
        this.cartItems.forEach((cartItem)=>{
          cartQuantity += cartItem.quantity;
        })
        return cartQuantity
    },
  
    addToCart(productId) {
      let matchingItem;
    
      let selectedElement =  document.querySelector(`.js-quantity-selector-${productId}`).value;
      let quantity = Number(selectedElement);
    
      this.cartItems.forEach((cartItem)=>{
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },
  
    removeFromCart(productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId != productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },
  
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach((cartItem)=>{
        if (cartItem.productId === productId) {
          cartItem.quantity = newQuantity
        }
      })
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      this.cartItem.forEach((cartItem)=>{
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      })
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    },
  
    renderCartQuantity() {
      const cartQuantity = updateCartQuantity()
      const cartQuantityElement = document.querySelector('.js-checkout-header-middle-section')
      if (cartQuantityElement) {
        cartQuantityElement.innerHTML = `${cartQuantity} items`;
      } else {
        console.error('element with class .js-checkout header-middle-section is not found')
      }
      
    }
  
  };
  return cart;
};
const cart = Cart('cart-oop');
const businessCart =  Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart)