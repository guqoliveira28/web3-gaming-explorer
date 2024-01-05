const localStorageFavorites: string = "favorites";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export { localStorageFavorites, formatPrice };
