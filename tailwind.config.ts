import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a192f',
        'dark-navy': '#020c1b',
        'light-navy': '#112240',
        'lightest-navy': '#233554',
        green: '#64ffda',
        'green-tint': 'rgba(100, 255, 218, 0.1)',
        slate: '#8892b0',
        'light-slate': '#a8b2d8',
        'lightest-slate': '#ccd6f6',
        offwhite: '#e6f1ff',
      },
      fontFamily: {
        mono: ['"SF Mono"', '"Fira Code"', '"Fira Mono"', '"Roboto Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
