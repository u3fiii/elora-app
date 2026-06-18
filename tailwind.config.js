/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FBF8F3',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#7CB9A0',
          light: '#E3F1EC',
          dark: '#5E9B83',
        },
        accentPink: {
          DEFAULT: '#F0A8BC',
          light: '#FCEAEF',
        },
        accentYellow: {
          DEFAULT: '#F8CE8C',
          light: '#FDF3E2',
        },
        accentBlue: {
          DEFAULT: '#B7C4EA',
          light: '#EDF0FB',
        },
        textMain: '#33302C',
        textMuted: '#9C9690',
        border: '#EFEAE3',
        wizard: {
          bg: '#AEE5D3',
          dome: '#B9EEDD',
          title: '#5A9E8F',
          dot: '#C5E8DC',
          dotActive: '#5A9E8F',
          card: '#79CCC2',
          cardSelected: '#49A3AA',
          cardBorder: '#79CCC2',
        },
      },
      fontFamily: {
        sans: ['BonyadeKoodak', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
