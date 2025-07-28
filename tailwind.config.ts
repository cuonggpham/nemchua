import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern green color palette for nature-inspired UI
        primary: {
          50: '#f0fdf4',   // Very light mint green
          100: '#dcfce7',  // Light mint green  
          200: '#bbf7d0',  // Soft green
          300: '#86efac',  // Light green
          400: '#4ade80',  // Medium green
          500: '#22c55e',  // Main green (vibrant)
          600: '#16a34a',  // Strong green
          700: '#15803d',  // Dark green
          800: '#166534',  // Darker green
          900: '#14532d',  // Very dark green
          950: '#052e16',  // Darkest green
        },
        secondary: {
          50: '#f8fafc',   // Very light gray
          100: '#f1f5f9',  // Light gray
          200: '#e2e8f0',  // Soft gray
          300: '#cbd5e1',  // Medium light gray
          400: '#94a3b8',  // Medium gray
          500: '#64748b',  // Base gray
          600: '#475569',  // Dark gray
          700: '#334155',  // Darker gray
          800: '#1e293b',  // Very dark gray
          900: '#0f172a',  // Almost black
          950: '#020617',  // Darkest
        },
        accent: {
          50: '#ecfdf5',   // Very light emerald
          100: '#d1fae5',  // Light emerald
          200: '#a7f3d0',  // Soft emerald
          300: '#6ee7b7',  // Light emerald
          400: '#34d399',  // Medium emerald
          500: '#10b981',  // Main emerald
          600: '#059669',  // Strong emerald
          700: '#047857',  // Dark emerald
          800: '#065f46',  // Darker emerald
          900: '#064e3b',  // Very dark emerald
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        muted: '#f8fafc',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        japanese: [
          'Hiragino Sans',
          'Hiragino Kaku Gothic Pro',
          'Yu Gothic',
          'Meiryo',
          'Takao',
          'IPAexGothic',
          'IPAPGothic',
          'VL PGothic',
          'Noto Sans CJK JP',
          'sans-serif'
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
