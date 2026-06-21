export function formatPrice(price: number | null, requestPrice: boolean) {
  if (requestPrice || price === null) {
    return "Price on Inquiry";
  }
  return `Ksh ${price.toLocaleString()}`;
}
