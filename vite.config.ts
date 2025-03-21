import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [], // Remove 'lucide-react' if unnecessary
  },
  build: {
    rollupOptions: {
      external: [], // Remove '@supabase/supabase-js' if unnecessary
    },
  },
});