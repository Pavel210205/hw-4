import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

import tsconfig from './tsconfig.node.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

    aliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return aliases;
};

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});
