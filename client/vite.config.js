import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // VVV ADD THIS BLOCK VVV
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your local backend server
        changeOrigin: true,
      }
    }
  }
  // ^^^ ADD THIS BLOCK ^^^
})