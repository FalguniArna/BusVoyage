import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true  // ← this forces it to always use 5173, never change
  }
})

