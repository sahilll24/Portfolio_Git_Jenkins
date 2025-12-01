import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,

    // ---------------------------
    // Jenkins Reporters
    // ---------------------------
    reporters: ['default', 'junit'],
    outputFile: './frontend-tests.xml',

    // ---------------------------
    // Coverage for SonarQube
    // ---------------------------
    coverage: {
  provider: 'v8',                        // keep this — required by Vitest
  reporter: ['text', 'json', 'html', 'lcov'], 
  reportsDirectory: './coverage',        // SonarQube will find lcov.info here

  exclude: [
    'node_modules/',
    'src/test/',
    '**/*.d.ts',
    '**/*.config.*',
    '**/mockData',
    '**/*.test.{ts,tsx}',
  ],
},
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
