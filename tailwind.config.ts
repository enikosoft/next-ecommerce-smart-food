import type {Config} from 'tailwindcss';

const config = {
  //darkMode: ["class"],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
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
      colors: {
        'primary-black': 'var(--primary-black)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
        },

        primaryRed: 'var(--primary-red)',
        darkGrey: 'var(--dark-grey)',
        mediumGrey: 'var(--medium-grey)',

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
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
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      height: {
        desktop: '105px',
        mobile: '56px',
        'desktop-full-screen': 'calc(100vh - 105px)',
        'mobile-full-screen': 'calc(100vh - 56px)',
      },
      boxShadow: {
        header: '0px 4px 20px 0px #0000000D',
      },

      // delete
      padding: {
        '2xl-container': '0 256px 0 256px',
        'xl-container': '0 144px 0 144px',
        'lg-container': '0 128px 0 128px',
        container: '0 128px 0 128px',
        'mobile-container': '0 16px 0 16px',
      },
      width: {
        headerBlock: 'calc(100wh - 64px)',
      },
      fontSize: {
        'heading-2': '1.875rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        roboto: ['var(--font-roboto)'],
        rubik: ['var(--font-rubik)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries')],
} satisfies Config;

export default config;
