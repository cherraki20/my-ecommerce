import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    setCartItems((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...items,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((items) => items.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    const next = Math.max(0, Math.floor(Number(quantity)));
    setCartItems((items) => {
      if (next <= 0) return items.filter((i) => i.id !== id);
      return items.map((i) => (i.id === id ? { ...i, quantity: next } : i));
    });
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((n, item) => n + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      itemCount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      itemCount,
    ]
  );

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
