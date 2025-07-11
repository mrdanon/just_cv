/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'sans': ['Arial', 'Helvetica', 'sans-serif'],
      },
      screens: {
        'print': {'raw': 'print'},
      },
      spacing: {
        '0.5in': '0.5in',
        '1in': '1in',
      },
      fontSize: {
        '9pt': '9pt',
        '10pt': '10pt',
        '11pt': '11pt',
        '12pt': '12pt',
        '14pt': '14pt',
        '18pt': '18pt',
      },
      lineHeight: {
        '1.4': '1.4',
      },
      maxWidth: {
        '8.5in': '8.5in',
        '210mm': '210mm',
      },
      width: {
        '80pt': '80pt',
        '100pt': '100pt',
        '210mm': '210mm',
      },
      height: {
        '80pt': '80pt',
        '100pt': '100pt',
      },
      margin: {
        '3pt': '3pt',
        '5pt': '5pt',
        '8pt': '8pt',
        '10pt': '10pt',
        '12pt': '12pt',
        '15pt': '15pt',
      },
      padding: {
        '2pt': '2pt',
        '3pt': '3pt',
        '4pt': '4pt',
        '8pt': '8pt',
        '10pt': '10pt',
      },
      borderWidth: {
        '1pt': '1pt',
        '2pt': '2pt',
      },
    },
  },
  plugins: [],
  // Ensure all Tailwind features are available
  corePlugins: {
    preflight: true,
  },
} 