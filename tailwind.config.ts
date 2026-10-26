import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#07090E",
          card: "#0D111A",
          elevated: "#121824",
          border: "#1C2536",
        },
        cyan: {
          glow: "#00F2FE",
          accent: "#00D2E0",
          dim: "#008A94",
        },
        blue: {
          accent: "#2D7FF9",
          muted: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 242, 254, 0.25)",
        "cyan-glow-lg": "0 0 35px -5px rgba(0, 242, 254, 0.4)",
        "card-hover": "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px -3px rgba(0, 242, 254, 0.2)",
      },
      borderRadius: {
        card: "16px",
        badge: "7px",
      },
    },
  },
  plugins: [],
};

export default config;
