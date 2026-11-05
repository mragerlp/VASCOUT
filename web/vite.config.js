import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export default defineConfig(() => {
  // Refresh generated public files even when cf invokes Vite directly.
  const publicDirectory = fileURLToPath(new URL('./public/', import.meta.url));
  mkdirSync(publicDirectory, { recursive: true });
  const copies = [
    ['../data/normalized/', './public/data/'],
    ['../assets/', './public/assets/'],
    ['../src/charming/ui.js', './public/ui.js'],
    ['../src/charming/styles.css', './public/styles.css']
  ];
  for (const [source, destination] of copies) {
    cpSync(fileURLToPath(new URL(source, import.meta.url)),
      fileURLToPath(new URL(destination, import.meta.url)), { recursive: true });
  }

  return {
    plugins: [cloudflare()],
    server: {
      host: '127.0.0.1',
      port: 5173
    },
    preview: {
      host: '127.0.0.1',
      port: 4173
    }
  };
});
