workbox.setConfig({ debug: true });

workbox.core.setCacheNameDetails({
  prefix: 'aklesky',
  suffix: 'v1',
  precache: 'custom-precache-name',
  runtime: 'custom-runtime-name'
});
