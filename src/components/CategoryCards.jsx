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

        {/* HEADER */}
        <div className="relative mb-10 flex items-center justify-center">
          <h2
            className="text-3xl font-bold text-[#1A1A2E] sm:text-4xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Nos Produits
          </h2>
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByOne(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full
                         border border-gray-200 bg-white text-[#1A1A2E]
                         transition-all duration-300 hover:bg-[#1D6FF2]
                         hover:text-white hover:border-[#1D6FF2]"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByOne(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full
                         border border-gray-200 bg-white text-[#1A1A2E]
                         transition-all duration-300 hover:bg-[#1D6FF2]
                         hover:text-white hover:border-[#1D6FF2]"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CARDS SCROLL */}
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
              className="group flex h-[300px] min-w-[240px] w-[240px] snap-start
                         flex-col overflow-hidden rounded-2xl border border-[#F0F0F0]
                         bg-white shadow-sm transition-all duration-300
                         hover:-translate-y-1 hover:shadow-md
                         hover:border-b-2 hover:border-b-[#1D6FF2]"
            >
              {/* TOP — category name */}
              <div className="p-4 pb-2 text-left">
                <h3 className="text-base font-bold leading-snug text-[#1A1A2E]">
                  {cat.name}
                </h3>
                {cat.count && (
                  <span className="text-xs text-gray-400 mt-1 block">
                    {cat.count} produits
                  </span>
                )}
              </div>

              {/* BOTTOM — image */}
              <div className="flex flex-1 items-center justify-center p-4 relative overflow-hidden">

                {/* Background subtle image */}
                {cat.bgImage && (
                  <img
                    src={cat.bgImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover
                               opacity-10 scale-105 blur-[1px]
                               transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Main product image */}
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="relative z-10 h-full w-full max-h-[160px] object-contain
                               drop-shadow-md transition-transform duration-300
                               group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#1D6FF2]/10
                                  flex items-center justify-center">
                    <span className="text-[#1D6FF2] font-black text-xl">
                      {cat.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}