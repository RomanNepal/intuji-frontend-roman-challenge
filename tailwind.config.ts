import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3F9BFC",
        success: "#12B76A",
        warning: "#FAC301",
        info: "#9CA3AF",
        selected: "#F4F8FB",
      },
    }
  },
  plugins: [],
};
export default config;
