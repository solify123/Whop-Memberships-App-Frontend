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
    allowedHosts: ["22074a4b0031.ngrok-free.app"]
  }
})
