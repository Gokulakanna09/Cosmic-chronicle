import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Space theme colors
        space: {
          deep: "hsl(var(--space-deep))",
          medium: "hsl(var(--space-medium))",
          light: "hsl(var(--space-light))",
          nebula: "hsl(var(--space-nebula))",
          star: "hsl(var(--space-star))",
          cosmic: "hsl(var(--space-cosmic))",
        },
        cosmic: {
          purple: "hsl(var(--cosmic-purple))",
          blue: "hsl(var(--cosmic-blue))",
          pink: "hsl(var(--cosmic-pink))",
          gold: "hsl(var(--cosmic-gold))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)" },
        },
        "cosmic-drift": {
          "0%": { transform: "translateX(-100vw) translateY(100vh)" },
          "100%": { transform: "translateX(100vw) translateY(-100vh)" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-5px)" },
          "75%": { transform: "translateY(-30px) translateX(8px)" },
        },
        "title-entrance": {
          "0%": {
            opacity: "0",
            transform: "scale(0.5) rotateY(-180deg)",
            filter: "blur(10px)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.1) rotateY(0deg)",
            filter: "blur(2px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotateY(0deg)",
            filter: "blur(0px)",
          },
        },
        "cosmic-pulse": {
          "0%, 100%": {
            textShadow:
              "0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            textShadow:
              "0 0 30px rgba(147, 51, 234, 0.8), 0 0 60px rgba(147, 51, 234, 0.5)",
            transform: "scale(1.02)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-delayed": "twinkle 3s ease-in-out infinite 1s",
        "twinkle-delayed-2": "twinkle 3s ease-in-out infinite 2s",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "cosmic-drift": "cosmic-drift 20s linear infinite",
        "particle-float": "particle-float 8s ease-in-out infinite",
        "title-entrance": "title-entrance 1.5s ease-out",
        "cosmic-pulse": "cosmic-pulse 3s ease-in-out infinite",
      },
      backgroundImage: {
        "space-gradient":
          "linear-gradient(135deg, hsl(var(--space-deep)) 0%, hsl(var(--space-medium)) 50%, hsl(var(--space-light)) 100%)",
        "cosmic-gradient":
          "linear-gradient(45deg, hsl(var(--cosmic-purple)), hsl(var(--cosmic-blue)), hsl(var(--cosmic-pink)))",
        "nebula-gradient":
          "radial-gradient(circle at center, hsl(var(--cosmic-purple) / 0.3), hsl(var(--cosmic-blue) / 0.2), transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
