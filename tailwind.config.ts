import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#14b8a6',
          600: '#0d9488'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
