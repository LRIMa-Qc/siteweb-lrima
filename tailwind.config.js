/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Keeping 'dark' object for backward compatibility but mapping to light/slate colors
        // This allows existing components to not break immediately, but we will refactor them.
        dark: {
          DEFAULT: '#ffffff',
          lighter: '#f8fafc', // Slate 50
          light: '#f1f5f9', // Slate 100
          card: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-shimmer':
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
        'gradient-dark': 'linear-gradient(to bottom, #0a0a0a, #141414)',
        'dot-pattern': 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-pattern': '24px 24px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            maxWidth: '65ch',
            '[class~="lead"]': {
              color: theme('colors.slate.600'),
            },
            strong: {
              color: theme('colors.slate.900'),
              fontWeight: '700',
            },
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            h1: {
              color: theme('colors.slate.900'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h2: {
              color: theme('colors.slate.900'),
              fontFamily: theme('fontFamily.display').join(', '),
              marginTop: '2em',
            },
            h3: {
              color: theme('colors.slate.900'),
              fontFamily: theme('fontFamily.display').join(', '),
              marginTop: '1.5em',
            },
            h4: {
              color: theme('colors.slate.900'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            code: {
              color: theme('colors.slate.900'),
              backgroundColor: theme('colors.slate.100'),
              padding: '0.25rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.8',
            h1: {
              fontSize: '2.5rem',
              lineHeight: '1.2',
            },
            h2: {
              fontSize: '1.875rem',
              lineHeight: '1.3',
            },
            h3: {
              fontSize: '1.5rem',
              lineHeight: '1.4',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
