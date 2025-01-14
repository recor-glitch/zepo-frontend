import type { Config } from "tailwindcss";

const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
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
        "primary-lighter": "#F0EFFB",
        "primary-light": "#D9D6F5",
        secondary: "#E0DEF7",
        skeleton: "#E2E8F0",

        // DARK SHADES
        "primary-dark": "#100A55",
        "primary-yellow": "#FFB154",

        // TEXT COLORS
        "text-primary": "#000929",
        "text-secondary": "#4D5461",
        "text-secondary-dark": "#6C727F",
        "text-normal": "#001619" /* 70% */,
        "text-white": "#FFFFFF",
        error: "#FF0000",

        // BORDER
        "border-primary": "#DEDEF7",
        "border-secondary": "#0E0854",

        // DIVIDER
        "divider-primary": "#E8E6F9",

        // BACKGROUND
        "bg-primary": "#F7F7FD",

        // DASHBOARD
        "dashboard-header-bg": "#F4F8EE",
        "income-card-1-bg": "#A7E0DA",
        "income-card-2-bg": "#E1F8FF",
        "income-card-3-bg": "#FBEBB8",

        // COLOR PALETTE
        "color-palette-1": "#F2D9C7",
        "color-palette-2": "#D9F2F5",
        "color-palette-3": "#B2E2D9",
        "color-palette-4": "#F0C79F",
        "color-palette-5": "#C5E8F2",
        "color-palette-6": "#96D6C9",
        "color-palette-7": "#FFD6A5",
        "color-palette-8": "#E5F5FF",
        "color-palette-9": "#B2E8D3",
        "color-palette-10": "#F0D7B2",
        "color-palette-11": "#D9E8F0",
        "color-palette-12": "#A2D6C1",
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
        "sm-subtitle": "0.75rem",
      },
      borderRadius: {
        default: "0.5rem",
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
        body: "4.5rem",

        "sq-btn": "0.875rem",
        icon: "0.75rem",
        default: "1rem",
        sm: "0.5rem",
        lg: "4rem",
        "avatar-outer": "0.375rem",
        xs: "0.25rem",
        "property-h": "5rem",
        huge: "32rem",
      },
      margin: {
        h: "3rem",
        v: "1.75rem",
        "nav-r": "16.25rem",
        "nav-l": "11.375rem",
        body: "4.5rem",
        sm: "0.5rem",
      },
      maxHeight: {
        "rent-card": "26rem",
      },
      minHeight: {
        "rent-card": "17.5rem",
      },
      height: {
        icon: "2rem",
        footer: "40.625rem",
        body: "55.25rem",
        "body-tour": "50.15rem",
        "body-stats": "41.25rem",
        "body-properties": "74.125rem",
        "route-h": "24.25rem",
        "sm-container": "3.5rem",
        "md-container": "6.5rem",
        "detail-container": "3.375rem",
        "mi-rent-card": "17.5rem",
        "ma-rent-card": "26rem",
        tab: "4rem",
        logo: "6rem",
        "tab-indicator": "2.9rem",
        like: "3rem",
        avatar: "3rem",
        "dashboard-avatar": "5rem",
      },
      maxWidth: {
        "rent-card": "20.25rem",
      },
      minWidth: {
        "rent-card": "12.375rem",
      },
      width: {
        icon: "2rem",
        "route-w": "15.344rem",
        "sm-container": "18.563rem",
        "md-container": "51.5rem",
        "detail-container": "9.313rem",
        logo: "8.375rem",
        tab: "4rem",
        "mi-rent-card": "12.375rem",
        "ma-rent-card": "20.25rem",
        like: "3rem",
        avatar: "3rem",
        "dashboard-avatar": "5rem",
      },
      gap: {
        h: "3rem",
        v: "1.75rem",
        "icon-spacing": "2.5rem",
        "text-spacing": "2rem",
        "text-spacing-stats": "5rem",
        "stat-v-divider": "1.688rem",
        xxs: "0.25rem",
        xs: "0.5rem",
        default: "1rem",
        sm: "1.5rem",
        md: "4rem",
      },
      zIndex: {
        default: "0",
        "layer-one": "10",
        "layer-two": "20",
        "layer-three": "30",
        "layer-four": "40",
        "layer-five": "50",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
