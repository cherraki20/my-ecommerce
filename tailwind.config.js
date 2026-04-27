/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F3A",
        accent: "#1D6FF2",
        surface: "#F4F6FA",
        ink: "#1A1A2E",
      },
      fontFamily: {
        heading: ["Syne", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 14px -2px rgba(11, 31, 58, 0.08)",
        "card-hover": "0 20px 40px -12px rgba(11, 31, 58, 0.18)",
      },
    },
  },
  plugins: [],
};
