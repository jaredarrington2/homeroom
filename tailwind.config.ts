import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#6B6B6B',
          faint: '#A8A8A8',
        },
        hairline: {
          DEFAULT: '#E5E5E5',
          strong: '#CFCFCF',
        },
        royal: {
          DEFAULT: '#1E3A8A',
          hover: '#1B3479',
          faint: '#E8EDF7',
        },
        loose: {
          paper: '#FAF7EE',
          rule: '#B8D4E8',
          margin: '#C8534F',
        },
        pencil: '#3F3F3F',
        warning: '#B45309',
        correct: {
          DEFAULT: '#15803D',
          faint: '#E8F2EC',
        },
        incorrect: {
          DEFAULT: '#B0504C',
          faint: '#F4EBEA',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        hand: ['Caveat', 'Patrick Hand', 'cursive'],
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '32': '8rem',
      },
      maxWidth: {
        reading: '38rem',
        canvas: '75rem',
      },
      letterSpacing: {
        eyebrow: '0.1em',
        display: '-0.025em',
      },
      keyframes: {
        'dot-pulse': {
          '0%, 80%, 100%': { opacity: '0.3', transform: 'scale(0.85)' },
          '40%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'dot-pulse': 'dot-pulse 1.2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
