export const workboxBundle = {
  exclude: [
    /\.txt$/,
    /\.html$/,
    /\.LICENSE$/,
    /manifest.json$/,
    /.hot-update.json$/,
    /.hot-update.js$/,
    /manifest.(.*).json$/i,
  ],
};

export const workboxRuntimeCashing = [
  {
    urlPattern: /\.(?:png|gif|jpg|jpeg|svg|ico|webp)$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'cache-media',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /assets\/fonts/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'cache-fonts',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:js|css)$/,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'cache-assets',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: '/__webpack_hmr',
    handler: 'NetworkFirst',
  },
  {
    urlPattern: /.*/,
    options: {
      cacheName: 'html-cache',
    },
    handler: 'NetworkFirst',
  },
];
