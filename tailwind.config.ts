import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        "text-secondary-dark": "#6C727F",
        "text-normal": "#001619" /* 70% */,
        "text-white": "#FFFFFF",

        // BORDER
        "border-primary": "#DEDEF7",
        "border-secondary": "#0E0854",

        // DIVIDER
        "divider-primary": "#E8E6F9",

        // BACKGROUND
        "bg-primary": "#F7F7FD",
      },
      fontSize: {
        "lg-header": "4rem",
        "md-header": "2.5rem",
        "lg-subtitle": "1.25rem",
        "md-title": "1.5rem",
        "md-primary-header": "2rem",
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

        "sm-h": "2rem",
        "sm-v": "1.563rem",

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
        body: "50.25rem",
        "route-h": "24.25rem",
        "sm-container": "3.5rem",
        "md-container": "6.5rem",
        "detail-container": "3.375rem",
      },
      width: {
        "route-w": "15.344rem",
        "sm-container": "18.563rem",
        "md-container": "48.938rem",
        "detail-container": "9.313rem",
      },
      gap: {
        h: "3rem",
        v: "1.75rem",
        "icon-spacing": "2.5rem",
        "text-spacing": "2rem",
        "text-spacing-stats": "5rem",
        "stat-v-divider": "1.688rem",
      },
    },
  },
  plugins: [],
};
export default config;
