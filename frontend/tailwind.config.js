/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#3c8b89',
          dark: '#2a6360',
          light: '#5aadab',
          xlight: '#c8e8e7',
        },
        yellow: {
          DEFAULT: '#eae38d',
          dark: '#d4cc5a',
          light: '#f5f2b8',
        },
        bg: '#f0f7f7',
        text: {
          DEFAULT: '#1a2e2e',
          muted: '#6b8f8e',
        },
        severity: {
          mild: { bg: '#e8f5e9', text: '#2e7d32' },
          moderate: { bg: '#fff3e0', text: '#e65100' },
          severe: { bg: '#fce4ec', text: '#b71c1c' },
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['36px', { lineHeight: '1.2' }],
        'section-title': ['18px', { lineHeight: '1.3' }],
        body: ['14px', { lineHeight: '1.5' }],
        label: ['12px', { lineHeight: '1.4' }],
        tiny: ['10px', { lineHeight: '1.4' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

