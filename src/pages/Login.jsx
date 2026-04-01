import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Shield, Eye, EyeOff, Check } from "lucide-react";
import logo from "../assets/logo.svg";
import { setAuthState } from "../utils/authStorage.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "L'email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Format d'email invalide.";
    }
    if (!password) next.password = "Le mot de passe est requis.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const trimmed = email.trim();
    const displayName = trimmed.split("@")[0].replace(/\./g, " ");
    setAuthState({
      isLoggedIn: true,
      user: {
        name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email: trimmed,
        role: "Administrateur",
      },
    });

    if (!remember) {
      /* "Se souvenir" — données déjà en localStorage; option pourrait lier session courte */
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen font-body">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-16 bottom-0 opacity-[0.07]">
          <Shield className="h-96 w-96 text-white" strokeWidth={0.75} />
        </div>
        <div>
          <img src={logo} alt="SFIB" className="h-10 w-auto" />
          <p className="mt-4 font-heading text-lg font-semibold text-accent">
            La sécurité en toute confiance
          </p>
        </div>
        <div className="relative z-10 max-w-md space-y-4">
          {[
            "Gérez vos produits",
            "Suivez vos statistiques",
            "Accès sécurisé",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 text-sm text-white/90">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check className="h-4 w-4" />
              </span>
              {text}
            </div>
          ))}
        </div>
        <p className="relative z-10 text-xs text-white/50">
          © SFIB Security — Espace professionnel
        </p>
      </div>

      <div className="flex w-full flex-1 items-center justify-center bg-surface p-6 sm:p-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <img src={logo} alt="SFIB" className="h-9 w-auto" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-ink">Connexion</h1>
          <p className="mt-2 text-sm text-ink/60">
            Accédez à votre tableau de bord SFIB.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label htmlFor="login-email" className="text-sm font-medium text-ink">
                Email
              </label>
              <div
                className={`mt-2 flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 transition-colors duration-200 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 ${
                  errors.email ? "border-red-400" : "border-ink/10"
                }`}
              >
                <Mail className="h-5 w-5 shrink-0 text-ink/40" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((er) => ({ ...er, email: "" }));
                  }}
                  className="w-full bg-transparent text-ink placeholder:text-ink/40 focus:outline-none"
                  placeholder="vous@entreprise.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="text-sm font-medium text-ink">
                Mot de passe
              </label>
              <div
                className={`mt-2 flex items-center gap-2 rounded-lg border bg-white px-3 py-2.5 transition-colors duration-200 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 ${
                  errors.password ? "border-red-400" : "border-ink/10"
                }`}
              >
                <input
                  id="login-password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((er) => ({ ...er, password: "" }));
                  }}
                  className="w-full bg-transparent text-ink placeholder:text-ink/40 focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="rounded-md p-1 text-ink/50 transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
                  aria-label={showPw ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPw ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink/80">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-ink/20 text-accent focus:ring-accent"
                />
                Se souvenir de moi
              </label>
              <Link
                to="/contact"
                className="text-sm font-medium text-accent transition-colors duration-200 hover:text-primary"
              >
                Mot de passe oublié?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md"
            >
              Se connecter
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-ink/10" />
            <span className="text-xs font-medium text-ink/40">— ou —</span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>

          <p className="text-center text-sm text-ink/70">
            Pas encore de compte?{" "}
            <Link
              to="/register"
              className="font-semibold text-accent transition-colors duration-200 hover:text-primary"
            >
              S&apos;inscrire →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
