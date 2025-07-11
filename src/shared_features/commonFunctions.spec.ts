import { convertUSD, getDiscountedPrice } from "./commonFunctions";


test('Convert 1 USD to INR should result in 85.52', () => {
    expect(convertUSD(1)).toBe(85.52)
})

test('Convert 1 USD to INR should result in 85.52', () => {
    expect(convertUSD(2)).toBe(171.04)
})

test('Convert 1 USD to INR then put a discount of 10 percent should result in 85.52', () => {
    expect(getDiscountedPrice(1,10)).toBe(76.968.toFixed(2))
})