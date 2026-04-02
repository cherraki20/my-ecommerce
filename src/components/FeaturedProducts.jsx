import ProductCard from "./ProductCard.jsx";

export default function FeaturedProducts() {
  const featured = useMemo(() => {
    return products.filter((p) => p.featured).slice(0, 8);
  }, []);

  return (
    <section className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[#1D6FF2] text-xs font-semibold uppercase tracking-widest leading-relaxed">
              NOS SÉLECTIONS
            </p>
            <h2
              className="text-4xl font-black text-[#0B1F3A]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Produits Vedettes
            </h2>
          </div>

          <Link
            to="/products"
            className="group flex items-center gap-2 text-[#1D6FF2] font-extrabold uppercase tracking-widest text-xs hover:gap-3 transition-all"
          >
            Voir tous les produits <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
