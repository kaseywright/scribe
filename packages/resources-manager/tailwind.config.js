/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },

      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "var(--theia-button-background)",
        "primary-50": "var(--theia-selection-background)",
        secondary: "var(--theia-editor-foreground)",
        success: "var(--theia-successBackground)",
        error: "var(--theia-errorBackground)",
        validation: "var(--theia-inputValidation-errorBackground)",
        light: "var(--theia-editor-background)",
        dark: "var(--theia-editor-foreground)",
        border: "var(--theia-editorWidget-border)",
        input: "var(--theia-input-background)",
        ring: "var(--theia-focusBorder)",
        background: "var(--theia-editor-background)",
        foreground: "var(--theia-editor-foreground)",
        destructive: {
          DEFAULT: "var(--theia-errorBackground)",
          foreground: "var(--theia-statusBarItem-errorForeground)",
        },
        muted: {
          DEFAULT: "var(--theia-descriptionForeground)",
          foreground: "var(--theia-disabledForeground)",
        },
        accent: {
          DEFAULT: "var(--theia-textLink-foreground)",
          foreground: "var(--theia-textLink-activeForeground)",
        },
        popover: {
          DEFAULT: "var(--theia-editorWidget-background)",
          foreground: "var(--theia-editorWidget-foreground)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        table: {
          header: "var(--theia-editorWidget-background)",
          row: "var(--theia-list-hoverBackground)",
          border: "var(--theia-list-inactiveSelectionBackground)",
        },
        dropdown: {
          background: "var(--theia-dropdown-background)",
          border: "var(--theia-dropdown-border)",
          text: "var(--theia-dropdown-foreground)",
        },
        "secondary-foreground": "var(--theia-button-secondaryForeground)",
        "destructive-foreground": "var(--theia-statusBarItem-errorForeground)",
      },
      fontSize: {
        custom: "8px",
        xxs: ".65rem",
      },
      height: {
        editor: "calc(-9rem + 100vh)",
        reference: "calc((-9.5rem + 100vh)/2)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  // darkMode: ["selector", '[class="vscode-dark"]'],
  darkMode: ["class", "vscode-dark", "theia-dark"],
};
