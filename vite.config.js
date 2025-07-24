import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; // Import 'path' module
import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url'
// Get the current file's path and then its directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
		base: '/vaep',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
