/**
 * This function calculates total price of a new order
 * @param {Array} products cartProducts: Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (products) => {
  return products.reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);
};
