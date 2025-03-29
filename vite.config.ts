import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
//fluffy-icons-feel.loca.lt
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true
  }
})
