import { useNavigate } from "react-router-dom";
import { X, Trash2, Heart, ExternalLink } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist.js";

export default function WishlistDrawer({ open, onClose }) {
  const { items, removeFromWishlist, itemCount } = useWishlist();
  const navigate = useNavigate();

  const handleQuoteRequest = () => {
    // Navigate to contact with the list of items
    const productNames = items.map((i) => i.name).join(", ");
    navigate("/contact", { 
      state: { 
        selectedProducts: productNames,
        message: `Bonjour, je souhaite recevoir un devis pour les produits suivants sélectionnés dans ma liste d'intérêt :\n- ${items.map(i => i.name).join('\n- ')}`
      } 
    });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[60] h-screen w-full max-w-md bg-[#0a0f1e] text-white shadow-2xl transition-transform duration-500 ease-in-out border-l border-white/10 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-cyan-400" fill="currentColor" />
              <h2 className="text-xl font-black uppercase tracking-widest text-white">Ma Liste d'Intérêt</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {itemCount === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center text-center opacity-40">
                <Heart className="mb-4 h-12 w-12" />
                <p className="text-sm font-medium uppercase tracking-widest">Votre liste est vide.</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 glass-card p-3 rounded-xl border-white/5 group">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between items-start">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs font-black uppercase tracking-widest text-white/30 italic">
                          {item.brand}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="mt-2 flex items-center gap-1 text-[10px] font-bold text-red-400/80 transition-colors hover:text-red-400 uppercase tracking-tighter"
                      >
                        <Trash2 className="h-3 w-3" />
                        Retirer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {itemCount > 0 && (
            <div className="border-t border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Total sélection</span>
                <span className="text-lg font-black text-white">{itemCount} produit{itemCount > 1 ? 's' : ''}</span>
              </div>
              
              <button
                onClick={handleQuoteRequest}
                className="w-full relative group overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-xs font-black text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95 uppercase tracking-[0.1em]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    DEMANDER UN DEVIS
                    <ExternalLink className="h-3 w-3" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              </button>
              
              <p className="mt-4 text-center text-[10px] text-white/30 uppercase tracking-widest font-bold">
                Prix sur devis personnalisé
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
