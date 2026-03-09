import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05070b',
        panel: '#0d1118',
        panelSoft: '#111827',
        border: '#1f2937',
        text: '#e5e7eb',
        textMuted: '#94a3b8',
        accent: '#3b82f6',
        positive: '#22c55e',
        negative: '#ef4444',
        amber: '#f59e0b',
        purple: '#a855f7'
      },
      boxShadow: {
        panel: '0 10px 30px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
};

export default config;
