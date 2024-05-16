import type { Config } from "tailwindcss"

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
        primary: "var(--primary-color)",
        paper: "var(--paper-color)",
        "paper-secondary": "var(--paper-secondary-color)",
        disabled: 'calc("var(--primary-color) + 0.5)',
      },
      fontSize: {
        xs: "12px",
      },
      borderColor: {
        default: "var(--border-color)",
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
}
export default config
