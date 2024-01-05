const localStorageFavorites: string = "favorites";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function getFavoritesFromStorage(): number[] {
  const saved = localStorage.getItem(localStorageFavorites);
  if (!saved) {
    return [];
  }
  const initialFavorites = JSON.parse(saved);
  return initialFavorites || [];
}

export { localStorageFavorites, formatPrice, getFavoritesFromStorage };
