import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 'fetch-prefix': 'backend-url:PORT'
      '/api': 'http://localhost:4000',
      '/rest': 'http://localhost:4000',
      '/logout': 'http://localhost:4000',
      
      '/whoami': 'http://localhost:4000',
      '/login': 'http://localhost:4000',
      '/register': 'http://localhost:4000',
    }
  }
})
