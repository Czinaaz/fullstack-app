import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'


export default defineConfig({
  base: '/fullstack-app/',
  plugins: [react(), mkcert()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vz6cm66j-8000.euw.devtunnels.ms',
        changeOrigin: true,
      }
    },
    https: true, 
    historyApiFallback: true 
  }
})
