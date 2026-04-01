import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories.js";

export default function CategoryCards() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollByOne = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section className="bg-[#F8F9FA] py-16">
      <div className="mx-auto max-w-7xl px-8">
        <div className="relative mb-10 flex items-center justify-center">
          <h2 className="font-heading text-3xl font-bold text-[#1A1A2E] sm:text-4xl">
            Nos Produits
          </h2>
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByOne(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1A1A2E] transition-all duration-300 ease-in-out hover:bg-[#1D6FF2] hover:text-white"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5 transition-colors duration-300 ease-in-out" />
            </button>
            <button
              type="button"
              onClick={() => scrollByOne(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1A1A2E] transition-all duration-300 ease-in-out hover:bg-[#1D6FF2] hover:text-white"
              aria-label="Next categories"
            >
              <ChevronRight className="h-5 w-5 transition-colors duration-300 ease-in-out" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(cat.slug)}`)
              }
              className="group flex h-[300px] min-w-[240px] w-[240px] snap-start flex-col overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 border-b-2 border-transparent group-hover:border-b-[#1D6FF2]"
            >
              <div className="h-[120px] w-full p-4 pb-2">
                <h3 className="text-base font-bold leading-snug text-[#1A1A2E]">
                  {cat.name}
                </h3>
              </div>

              <div className="flex h-[180px] flex-1 items-center justify-center p-4">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.classList.add("hidden");
                      const fallback = img.parentElement?.querySelector(
                        '[data-fallback="1"]'
                      );
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                    className="h-full w-full max-h-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : null}
                <span
                  data-fallback="1"
                  className={
                    cat.image
                      ? "hidden w-full text-center font-heading text-sm font-bold text-[#1A1A2E]/70"
                      : "w-full text-center font-heading text-sm font-bold text-[#1A1A2E]/70"
                  }
                >
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
