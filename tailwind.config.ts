import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'twm': "url('/background.png')",
      },
      colors: {
        'twm-logo-bg': '#170B23',
        'twm-highlight': '#9319FF',
        'twm-sun': '#FFEB4A',
      },
      fontFamily: {
        'main': 'TERMINUS',
      }
    },
  },
  plugins: [],
}
export default config
