import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart.js";

export default function Cart() {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <div className="bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-xl bg-white p-10 text-center shadow-md">
            <p className="font-body text-ink/70">Your cart is empty.</p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/90"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-32 w-full rounded-lg object-cover sm:h-24 sm:w-32"
                />
                <div className="flex-1">
                  <h2 className="font-heading text-lg font-semibold text-ink">
                    {item.name}
                  </h2>
                  <p className="text-sm text-ink/50">{item.brand}</p>
                  <p className="mt-2 font-heading font-bold text-accent">
                    ${item.price.toLocaleString()} each
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="rounded-full border border-ink/15 p-2 transition-colors duration-300 ease-in-out hover:border-accent"
                      aria-label="Decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="rounded-full border border-ink/15 p-2 transition-colors duration-300 ease-in-out hover:border-accent"
                      aria-label="Increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="inline-flex items-center gap-1 text-sm text-ink/50 transition-colors duration-300 ease-in-out hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-medium text-ink/60 transition-colors duration-300 ease-in-out hover:text-red-600"
                >
                  Clear cart
                </button>
                <p className="mt-4 font-heading text-2xl font-bold text-ink">
                  Total: $
                  {totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/90"
              >
                Place order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
