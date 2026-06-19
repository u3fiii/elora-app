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
        home: {
          bg: '#FAF8F3',
          mint: '#7ECAB0',
          teal: '#6EB7BC',
          pink: '#EFA8BE',
          yellow: '#F2D490',
          lavender: '#C4B7E8',
          peach: '#F5B89A',
          heading: '#1A1A2E',
          muted: '#A8B0C0',
          border: '#D8D4CA',
          chipBorder: '#E0DCD2',
          pill: '#F3EFE8',
          nav: '#D0F6E9',
          navHover: '#B6E3D3',
          doneBg: '#E4F4EE',
          streakBg: '#FFF3EE',
        },
      },
      fontFamily: {
        sans: ['BonyadeKoodak', 'sans-serif'],
        vazir: ['Vazirmatn', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
