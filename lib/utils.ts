export function formatPrice(price: number | null, requestPrice: boolean) {
  if (requestPrice || price === null) {
    return "Price on Inquiry";
  }
  return `Ksh ${price.toLocaleString()}`;
}

export function cleanId(id: string | undefined): string | undefined {
  return (!id || id === "undefined" || id === "$undefined") ? undefined : id;
}
