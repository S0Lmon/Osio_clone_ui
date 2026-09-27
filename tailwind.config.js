/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'forest-black': '#0A0F0D',
        'forest-dark': '#141F1A',
        'tech-cyan': '#00D4FF',
        'text-primary': '#E8F5E9',
        'text-muted': '#6B8F71',

        /* Thang mức độ bệnh — PHẢI khớp với app nông dân.
           app (nền sáng): #2E7D32 #F9A825 #EF6C00 #C62828
           cổng (nền tối): dưới đây. Cùng hệ màu, chỉnh độ sáng cho nền tối. */
        'sev-healthy': '#4CAF50',
        'sev-light':   '#FFCA28',
        'sev-medium':  '#FF9800',
        'sev-high':    '#EF5350',
      },
      fontFamily: {
        /* Be Vietnam Pro có đủ dấu tiếng Việt; Orbitron/Urbanist thì không. */
        sans: ['Be Vietnam Pro', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
