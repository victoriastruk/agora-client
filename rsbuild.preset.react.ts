import { pluginReact } from '@rsbuild/plugin-react';
import type { RsbuildPlugin } from '@rsbuild/core';

type PresetOptions = {
  mode: 'development' | 'production';
  analyze?: boolean;
};

export function reactAppPreset({ mode, analyze }: PresetOptions): RsbuildPlugin {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    name: 'react-app-preset',

    setup(api) {
      api.modifyRsbuildConfig(config => {
        config.plugins ??= [];
        config.plugins.push(
          pluginReact({
            fastRefresh: isDev,
            enableProfiler: isProd,
            splitChunks: true,
          }),
        );

        config.performance ??= {};
        config.performance.bundleAnalyze = analyze ? { openAnalyzer: true } : undefined;

        config.performance.chunkSplit = isProd
          ? {
              strategy: 'split-by-experience',
              override: {
                chunks: 'all',
                minSize: 20_000,
                maxInitialRequests: 30,
                maxAsyncRequests: 30,
              },
            }
          : {
              strategy: 'split-by-experience',
              override: {
                chunks: 'all',
                minSize: 100_000,
                maxInitialRequests: 6,
                maxAsyncRequests: 6,
              },
            };

        config.output ??= {};
        config.output.target = 'web';
        config.output.minify = isProd;
        config.output.sourceMap = isDev;
        config.output.cleanDistPath = true;

        config.output.filename = {
          js: 'assets/js/[name].[contenthash:8].js',
          css: 'assets/css/[name].[contenthash:8].css',
          image: 'assets/img/[name].[hash][ext]',
          font: 'assets/fonts/[name].[hash][ext]',
        };
      });
    },
  };
}
