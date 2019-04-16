import { join } from 'path';
import { media, publicPath } from './paths';

export const bundle = {
  assets: 'assets',
  media: {
    publicPath: join(publicPath, 'assets', 'media'),
    destination: join('assets', 'media')
  },
  fonts: {
    publicPath: join(publicPath, 'assets', 'fonts'),
    destination: join('assets', 'fonts')
  },
  serviceWorker: join('assets', 'sw.js'),
  assetsManifest: join('assets', 'assets-manifest.json'),
  manifest: join('assets', 'manifest.[hash].json'),
  precacheManifest: join('assets', 'precache-manifest.[manifestHash].js'),
  swCore: join(publicPath, 'assets', 'sw-core.js'),
  icon: join(media, 'bundle.png'),
};
