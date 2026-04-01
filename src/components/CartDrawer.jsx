import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "../hooks/useCart.js";

export default function CartDrawer({ open, onClose }) {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/50 transition-opacity duration-300 ease-in-out ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-heading text-lg font-bold text-ink">Your Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-ink/60 transition-colors duration-300 ease-in-out hover:bg-surface hover:text-ink"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <p className="text-center font-body text-sm text-ink/60">
              Your cart is empty. Explore products to get started.
            </p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-ink/10 bg-surface/50 p-3"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate font-heading text-sm font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink/50">{item.brand}</p>
                    <p className="mt-1 font-heading text-sm font-bold text-accent">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="rounded-full border border-ink/15 p-1 text-ink transition-colors duration-300 ease-in-out hover:border-accent hover:text-accent"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="rounded-full border border-ink/15 p-1 text-ink transition-colors duration-300 ease-in-out hover:border-accent hover:text-accent"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto rounded-full p-1 text-ink/40 transition-colors duration-300 ease-in-out hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ink/10 px-5 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-body text-sm font-medium text-ink/70">
              Total
            </span>
            <span className="font-heading text-xl font-bold text-ink">
              ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="mb-3 w-full rounded-full border border-ink/15 py-2.5 text-sm font-medium text-ink/70 transition-all duration-300 ease-in-out hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Clear cart
            </button>
          )}
          <Link
            to="/cart"
            onClick={(e) => {
              if (cartItems.length === 0) {
                e.preventDefault();
                return;
              }
              onClose();
            }}
            className={`flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out ${
              cartItems.length === 0
                ? "pointer-events-none bg-ink/30"
                : "bg-accent hover:bg-accent/90 hover:shadow-md"
            }`}
            aria-disabled={cartItems.length === 0}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
