/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        sidebar: "var(--color-sidebar)",
        "sidebar-2": "var(--color-sidebar-2)",
        accent: "var(--color-accent)",
        "accent-2": "var(--color-accent-2)",
        "accent-soft": "var(--color-accent-soft)",
        "accent-solid": "var(--color-accent-solid)",
        text: "var(--color-text)",
        "text-2": "var(--color-text-2)",
        "text-3": "var(--color-text-3)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        err: "var(--color-err)",
        "err-soft": "var(--color-err-soft)",
        warn: "var(--color-warn)",
        "warn-soft": "var(--color-warn-soft)",
        success: "var(--color-success)",
        "success-soft": "var(--color-success-soft)",
        ink: "var(--color-ink-soft)",
      },
    },
  },
  plugins: [],
};
