import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        panel: '#f8f5ff',
        panelSoft: '#f3eeff',
        border: '#e4d9f5',
        text: '#1a0a2e',
        textMuted: '#6b5f8a',
        accent: '#7c3aed',
        positive: '#16a34a',
        negative: '#dc2626',
        amber: '#d97706',
        purple: '#7c3aed'
      },
      boxShadow: {
        panel: '0 4px 16px rgba(124,58,237,0.08)'
      }
    }
  },
  plugins: []
};

export default config;
