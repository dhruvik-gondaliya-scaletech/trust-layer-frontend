import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      'astrology-regulatory-craft-attempted.trycloudflare.com',
      'nails-welding-participate-crm.trycloudflare.com',
      '.trycloudflare.com'
    ],
  },
})
