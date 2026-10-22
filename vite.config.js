import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        search: 'search.html',
        movie: 'movie.html',
      },
    },
  },
});