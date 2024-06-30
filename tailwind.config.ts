import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      // => @media (min-width: 375px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
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

        // DIVIDER
        "divider-primary": "#E8E6F9",
      },
      fontSize: {
        "lg-header": "4rem",
        "md-header": "2.5rem",
        "lg-subtitle": "1.25rem",
        "md-title": "1.5rem",
        "md-subtitle-main": "1.125rem",
        "md-subtitle-primary": "1rem",
        "md-subtitle-secondary": "0.875rem",
      },
      borderRadius: {
        ss: "0.5rem",
      },
      padding: {
        h: "3rem",
        v: "1.75rem",

        // BUTTON
        "btn-v": "0.75rem",
        "btn-h": "1.5rem",

        // FOOTER
        "footer-v": "2rem",
      },
      margin: {
        h: "3rem",
        v: "1.75rem",
        "nav-r": "16.25rem",
        "nav-l": "11.375rem",
      },
      height: {
        footer: "40.625rem",
      },
      gap: {
        h: "3rem",
        v: "1.75rem",
        "icon-spacing": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
