import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Shield } from "lucide-react";
import logo from "../assets/logo.svg";
import { setAuthState } from "../utils/authStorage.js";

function passwordStrength(pw) {
  if (!pw) return { label: "", widthClass: "w-0", bar: "", level: 0 };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  let level = Math.min(3, Math.max(1, Math.ceil(score / 2)));
  if (pw.length < 8) level = 1;
  const map = [
    { label: "", widthClass: "w-0", bar: "" },
    { label: "Faible", widthClass: "w-1/3", bar: "bg-red-500" },
    { label: "Moyen", widthClass: "w-2/3", bar: "bg-amber-500" },
    { label: "Fort", widthClass: "w-full", bar: "bg-emerald-500" },
  ];
  return { ...map[level], level };
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const strength = useMemo(() => passwordStrength(form.password), [form.password]);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Requis.";
    if (!form.email.trim()) e.email = "Requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Email invalide.";
    }
    if (!form.phone.trim()) e.phone = "Requis.";
    if (!form.company.trim()) e.company = "Requis.";
    if (!form.password) e.password = "Requis.";
    else if (form.password.length < 8) {
      e.password = "Minimum 8 caractères.";
    }
    if (form.password !== form.confirm) e.confirm = "Les mots de passe ne correspondent pas.";
    if (!form.terms) e.terms = "Vous devez accepter les conditions.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    setAuthState({
      isLoggedIn: true,
      user: {
        name: form.name.trim(),
        email: form.email.trim(),
        role: "Administrateur",
      },
    });
    navigate("/dashboard", { replace: true });
  };

  const inputClass = (key) =>
    `mt-2 w-full rounded-lg border bg-white px-4 py-3 text-ink transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
      errors[key] ? "border-red-400" : "border-ink/10"
    }`;

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
          <h1 className="font-heading text-3xl font-bold text-ink">
            Créer un compte
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Rejoignez l&apos;espace distributeur SFIB.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="reg-name">
                Nom complet
              </label>
              <input
                id="reg-name"
                className={inputClass("name")}
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="reg-email">
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                className={inputClass("email")}
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="reg-phone">
                Téléphone
              </label>
              <input
                id="reg-phone"
                type="tel"
                autoComplete="tel"
                className={inputClass("phone")}
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="reg-co">
                Société
              </label>
              <input
                id="reg-co"
                className={inputClass("company")}
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="reg-pw">
                Mot de passe
              </label>
              <input
                id="reg-pw"
                type="password"
                autoComplete="new-password"
                className={inputClass("password")}
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
              />
              {form.password && strength.level > 0 && (
                <div className="mt-2">
                  <div className="mb-1 flex justify-between text-xs text-ink/60">
                    <span>Force du mot de passe</span>
                    <span className="font-medium text-ink">{strength.label}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${strength.bar} ${strength.widthClass}`}
                    />
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="reg-pw2">
                Confirmer mot de passe
              </label>
              <input
                id="reg-pw2"
                type="password"
                autoComplete="new-password"
                className={inputClass("confirm")}
                value={form.confirm}
                onChange={(e) => setField("confirm", e.target.value)}
              />
              {errors.confirm && (
                <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-3 pt-2 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => {
                  setField("terms", e.target.checked);
                  if (errors.terms) setErrors((er) => ({ ...er, terms: "" }));
                }}
                className="mt-1 h-4 w-4 rounded border-ink/20 text-accent focus:ring-accent"
              />
              <span>
                J&apos;accepte les{" "}
                <Link to="/contact" className="font-medium text-accent hover:underline">
                  conditions d&apos;utilisation
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms}</p>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md"
            >
              Créer mon compte
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink/70">
            Déjà un compte?{" "}
            <Link
              to="/login"
              className="font-semibold text-accent transition-colors duration-200 hover:text-primary"
            >
              Se connecter →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
