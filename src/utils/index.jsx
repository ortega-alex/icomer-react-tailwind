/**
 * This function calculates total proce of a new order
 * @param {Array} products CardProduct: Array of Objects
 * @returns {Number} Total Price
 */
export const totalPrice = products => {
    let sum = 0
    products.forEach(item => sum += item.price);
    return sum
}