import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port:5173,
    host: true,
    allowedHosts: ["c24c22552a52.ngrok-free.app"]
  }
})
