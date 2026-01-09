import { defineConfig, loadEnv } from '@rsbuild/core';
import { reactAppPreset } from './rsbuild.preset.react';

export default defineConfig(({ envMode }) => {
  const host = process.env.HOST || 'localhost';
  const port = Number(process.env.PORT || 3000);
  const previewPort = Number(process.env.PREVIEW_PORT || 4173);
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  const mode = (envMode === 'production' ? 'production' : 'development') as
    | 'development'
    | 'production';

  const preset = reactAppPreset({
    mode,
    analyze: Boolean(process.env.BUNDLE_ANALYZE),
  });

  return {
    mode,
    ...preset,
    source: {
      entry: { index: './src/app/index.tsx' },
      define: {
        __APP_ENV__: JSON.stringify(mode),
        __BACKEND_URL__: JSON.stringify(backendUrl),
      },
    },
    server: {
      host,
      port,
      strictPort: true,
      historyApiFallback: true,
      proxy: {
        '/auth': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
        '/me': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
        '/health': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    preview: {
      host: '0.0.0.0',
      port: previewPort,
      strictPort: true,
      cors: true,
    },

    tools: {
      rspack: {
        cache: { type: 'filesystem' },
        watchOptions: {
          ignored: /node_modules/,
          aggregateTimout: 100,
          poll: false,
        },
        optimization: {
          sideEffects: true,
        },
      },
    },
  };
});
