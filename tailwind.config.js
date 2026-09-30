/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User requested exact palette
        nightViolet: '#120824',        // Background color
        nightVioletDeep: '#0c0519',    // Deeper shade for gradients/footer
        darkViolet: '#1a0c2e',         // Navbar background
        darkVioletLight: '#22113d',    // Elevated navbar / dropdowns
        dragonfruit: '#FF2A8D',        // Primary accent & primary button
        dragonfruitHover: '#FF4696',   // User requested Hover background #FF4696
        dragonfruitLight: '#ff69ab',
        dragonfruitGlow: 'rgba(255, 42, 141, 0.35)',
        
        // Text palette
        mainHeading: '#FFFFFF',        // Main heading white
        lightLavender: '#E6DDF8',      // Normal text light lavender
        mutedLavender: '#A896C5',      // Secondary text muted lavender
        
        // Component specific user requirements
        cardBg: '#281640',             // Card background #281640
        cardBorder: '#3A2555',         // Card border #3A2555
        hoverBg: '#FF4696',            // Hover background #FF4696
        hoverText: '#1E1033',          // Hover text #1E1033
        inputBg: '#25143B',            // Input background #25143B
        inputBorder: '#49325F',        // Input border #49325F
        success: '#35D07F',            // Success #35D07F
        error: '#FF5C7A',              // Error #FF5C7A
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        fashion: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'dragonfruit': '0 4px 14px -2px rgba(255, 42, 141, 0.22)',
        'dragonfruit-lg': '0 6px 20px -3px rgba(255, 42, 141, 0.28)',
        'card-glow': '0 10px 30px -10px rgba(18, 8, 36, 0.8), 0 0 20px -5px rgba(58, 37, 85, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
