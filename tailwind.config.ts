import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#7065F0",
        secondary: "#E0DEF7",

        // DARK SHADES
        "primary-dark": "#100A55",
        "primary-yellow": "#FFB154",

        // TEXT COLORS
        "text-primary": "#000929",
        "text-secondary": "#4D5461",
        "text-white": "#FFFFFF",

        // BORDER
        "border-primary": "#DEDEF7",
        "border-secondary": "#0E0854",
      },
      fontSize: {
        "font-lg-header": "64px",
        "font-md-header": "40px",
        "font-lg-subtitle": "20px",
        "font-md-title": "24px",
        "font-md-subtitle-main": "18px",
        "font-md-subtitle-primary": "16px",
        "font-md-subtitle-secondary": "14px",
      },
      borderRadius: {
        "br-sm": "8px",
      },
    },
  },
  plugins: [],
};
export default config;
