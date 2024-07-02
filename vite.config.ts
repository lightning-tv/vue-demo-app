import { defineConfig } from 'vite';
import { importChunkUrl } from '@lightningjs/vite-plugin-import-chunk-url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import hexColorTransform from "@lightningtv/vite-hex-transform";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    hexColorTransform(),
    importChunkUrl(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['node', 'view', 'text'].includes(tag),
        },
      },
    }),
   vueJsx(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, './src/material-theme.json'),
    },
    dedupe: [
      "vue",
      "@vue/shared",
      "@vue/runtime-core",
      "@vue/reactivity",
      "@lightningjs/renderer",
      "@lightningtv/vue",
    ],
  },
});
