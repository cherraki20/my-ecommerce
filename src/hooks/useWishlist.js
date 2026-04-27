import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("sfib-wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("sfib-wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === product.id)) return prev;
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInWishlist = useCallback(
    (id) => !!items.find((i) => i.id === id),
    [items]
  );

  const clearWishlist = useCallback(() => setItems([]), []);

  const itemCount = items.length;

  const value = useMemo(
    () => ({
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      itemCount,
    }),
    [items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, itemCount]
  );

  return createElement(WishlistContext.Provider, { value }, children);
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
