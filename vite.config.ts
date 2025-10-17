import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 8882,
    host: true,
    cors: true,
    allowedHosts: ["81d7c3ea27f9.ngrok-free.app"]
  }
})
