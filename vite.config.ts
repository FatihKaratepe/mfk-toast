import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      include: ['src/lib/toast/**/*.ts', 'src/lib/toast/**/*.vue'],
      exclude: ['src/lib/toast/**/__tests__/**', 'src/lib/toast/**/*.test.ts'],
      outDir: 'dist',
      copyDtsFiles: true,
      staticImport: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/toast/index.ts'),
      name: 'MfkToast',
      fileName: (format) => `mfk-toast.${format === 'es' ? 'js' : 'umd.js'}`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name || '';
        },
      },
    },
    cssCodeSplit: false,
  },
});
