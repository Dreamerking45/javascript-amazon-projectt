export const orders = JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order) {
  order.unshift(order);
}
function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}