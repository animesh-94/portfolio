import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#ffffff",
          secondary: "#fafafa",
          card: "#ffffff",
          hover: "#f5f5f5",
        },
        accent: {
          green: "#000000",
        },
        border: {
          subtle: "#eeeeee",
          strong: "#000000",
        },
        text: {
          primary: "#000000",
          secondary: "#666666",
          muted: "#999999",
        },
      },
      fontFamily: {
        sans: ["var(--font-jetbrains)", "monospace"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
