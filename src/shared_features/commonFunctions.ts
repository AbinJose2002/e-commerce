export const getDiscountedPrice = (price: number, discount: number) => {
    return (price - price * (discount / 100)).toFixed(2)
  }