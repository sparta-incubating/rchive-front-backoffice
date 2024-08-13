import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        main: '1440px',
        sub: '1920px',
      },
      colors: {
        'success-green': '#31B32E',
        'point-color': '#FF6C79',
        'toast-color': '#3B82FF',
        primary: {
          50: '#FDEDEF',
          100: '#F8BFC7',
          200: '#F3919F',
          300: '#ED6377',
          400: '#E8344E',
          500: '#D31833',
          600: '#A51328',
          700: '#770D1D',
          800: '#490812',
          900: '#1B0307',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          50: '#F4F9FD',
          55: '#E8F3FB',
          100: '#C7E0F5',
          200: '#9CC9ED',
          300: '#71B1E5',
          400: '#459ADD',
          500: '#2581C8',
          600: '#1D66A0',
          700: '#154A75',
          800: '#0D2F49',
          900: '#05131E',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        blue: {
          50: '#F6F9FA',
          55: '#EEF3F6',
          100: '#D4E3E7',
          200: '#B4CDD5',
          300: '#93B7C3',
          400: '#72A1B1',
          500: '#56899A',
          600: '#436C79',
          700: '#314F59',
          800: '#1F3238',
          900: '#0D1417',
        },
        gray: {
          50: '#FAFAFA',
          100: '#DEE1E3',
          200: '#C3C8CB',
          300: '#A8AFB3',
          400: '#8C969B',
          500: '#727D83',
          600: '#5A6368',
          700: '#42494C',
          800: '#2B2F31',
          900: '#141617',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundColor: {
        ['image-black']: 'rgba(74, 74, 74, 0.6)',
      },
    },
    fontFamily: {
      main: ['Pretendard-Regular'],
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '2.5rem', // 40px
      '6xl': '3.125rem', // 50px
    },
    boxShadow: {
      selectBox:
        '0px 2px 6px 0px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
      signInBox: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      dashboardBox: '0px 40px 40px 0px rgba(65, 101, 112, 0.3)',
      rtanBox: '0px 3.47px 26.03px 0px rgba(65, 101, 112, 0.3)',
      dropDownBox:
        '0px 2px 6px 0px rgba(0, 0, 0, 0.05), 0px 1px 10px 0px rgba(0, 0, 0, 0.15)',
      inquiryButton: ' 0px 4px 6px 0px rgba(0, 0, 0, 0.02)',
    },
    backgroundImage: {
      'custom-gradient':
        ' linear-gradient(180deg, #E2F1FD 16.75%, #C3E2FB 40.96%, #4BA9F4 135.4%, #B9DDFB 135.4%)',
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],

  mode: 'jit',
} satisfies Config;

export default config;
