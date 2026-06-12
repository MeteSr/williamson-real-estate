import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal:   { DEFAULT: '#00CEC8', dark: '#00A8A3', light: '#E0FAF9' },
        cream:  '#FCEFC3',
        coral:  '#FF9C5F',
        brand:  { DEFAULT: '#EB4203', dark: '#C23502' },
        navy:   '#0D2149',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        lg:   '0 8px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
