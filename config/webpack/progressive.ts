import { colors } from '@/theme/colors';
import { bundle } from 'config/bundle';
import { isProduction } from 'config/env';
import { files } from 'config/files';
import { workboxBundle, workboxRuntimeCashing } from 'config/workbox';
import en from 'i18n/en.json';
import webpack from 'webpack';
import ManifestPlugin, { FileDescriptor } from 'webpack-manifest-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import WorkboxPlugin, { RuntimeCacheRule } from 'workbox-webpack-plugin';

export const progressive: webpack.Configuration = {
  mode: isProduction ? 'production' : 'development',
  plugins: [
    new ManifestPlugin({
      fileName: bundle.assetsManifest,
      filter: (file: FileDescriptor) => {
        return !files.filter.test(file.name);
      },
      map: (file: FileDescriptor) => {
        if (file && file.name.endsWith('sw.js')) {
          return {
            ...file,
            path: '/sw.js',
            name: 'sw.js'
          };
        }
        return file;
      }
    }),
    new WebpackPwaManifest({
      name: en.name,
      filename: bundle.manifest,
      short_name: en.short_name,
      description: en.description,
      background_color: colors.background,
      theme_color: colors.background,
      inject: true,
      ios: {
        'apple-mobile-web-app-title': en.name,
        'apple-mobile-web-app-status-bar-style': 'black'
      },
      crossorigin: 'use-credentials',
      icons: [
        {
          src: bundle.icon,
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true,
          destination: bundle.media.destination,
        },
        {
          src: bundle.icon,
          size: '1024x1024',
          ios: true,
          destination: bundle.media.destination,
        }
      ]
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: bundle.serviceWorker,
      precacheManifestFilename: bundle.precacheManifest,
      clientsClaim: true,
      skipWaiting: true,
      exclude: workboxBundle.exclude,
      runtimeCaching: workboxRuntimeCashing as RuntimeCacheRule[],
      importScripts: [bundle.swCore]
    })
  ]
};
