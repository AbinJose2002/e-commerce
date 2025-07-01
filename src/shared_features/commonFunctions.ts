export const convertUSD = (price: number): number => {
  return parseFloat((price * 85.52).toFixed(2));
};

export const getDiscountedPrice = (price: number, discount: number): string => {
  const inrPrice: number = convertUSD(price);
  const discountedPrice = inrPrice - inrPrice * (discount / 100);
  return discountedPrice.toFixed(2); // returns string, good for display
};
