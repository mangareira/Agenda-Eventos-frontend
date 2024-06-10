import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: '#06038D',
        'blue-600': '#7BC9FF',
        'gray-100': '#E1E1E1',
        'gray-200': '#EFEFF6',
        green_admin: '#006769',
        green_button: '#004040',
        hover_admin: '#40A578' 
      },
      borderRadius: {
        'xl-0.5': '10px',
        'md-0.5': '5px'
      },
      padding: {
        '2.5': '10px'
      },
      gap: {
        '2.5': '10px'
      }
    },
  },
  plugins: [],
};
export default config;
