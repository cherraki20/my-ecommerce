import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { getProductById } from "../data/products.js";
import { useCart } from "../hooks/useCart.js";

function Rating({ value }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rounded ? "fill-amber-400 text-amber-400" : "fill-transparent text-ink/25"
          }`}
          strokeWidth={i < rounded ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { productId } = useParams();
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-body text-ink">Product not found.</p>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mt-4 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-accent/90"
        >
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors duration-300 ease-in-out hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <img
              src={product.image}
              alt=""
              className="aspect-square w-full object-cover sm:aspect-[4/3] lg:aspect-auto lg:min-h-[480px]"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-ink/50">
              {product.brand}
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4">
              <Rating value={product.rating} />
            </div>
            <p className="mt-6 font-heading text-3xl font-bold text-accent">
              ${product.price.toLocaleString()}
            </p>
            <p className="mt-6 font-body leading-relaxed text-ink/80">
              {product.description}
            </p>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="mt-8 w-full max-w-md rounded-full bg-accent py-4 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/90 hover:shadow-md sm:w-auto sm:px-12"
            >
              Add to Cart
            </button>
            <p className="mt-6 text-sm text-ink/50">
              Category:{" "}
              <Link
                to={`/products?category=${product.category}`}
                className="font-medium text-accent hover:underline"
              >
                {product.category}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
