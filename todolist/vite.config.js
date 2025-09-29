import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    // Other configuration options
    // For example:
    // server: {
    //   port: 3000,
    // },
    // resolve: {
    //   alias: {
    //     '@': '/src',
    //   },
    // },
});