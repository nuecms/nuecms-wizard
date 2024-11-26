import { defineConfig } from 'tsup';
export default defineConfig({
  format: ['cjs'], // Output both CommonJS and ESM formats
  entry: {
    server: 'server/index.ts'
  }, // Include both index.ts and Driver.ts as entry points
  treeshake: true, // Remove unused code
  clean: true,
  minify: true, // Minify code
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  noExternal: [
    'express',
    'mysql2'
  ],
  onSuccess: async () => {
    console.log('Build succeeded!');
  }
});
