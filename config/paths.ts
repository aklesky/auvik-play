import { join } from 'path';
import { isProduction } from './env';

export const root = process.cwd();
export const lib = join(root, 'lib');
export const node_modules = join(root, 'node_modules');
export const tsConfig = join(root, 'tsconfig.json');
export const modulePackage: string = join(root, 'package.json');

export const publicPath = '/';

export const build = join(root, 'dist');
export const client = join(build, 'public');
export const server = join(build, 'server');
export const html = join(client, 'app.html');

export const assets = join(client, 'assets');
export const js = join(assets, 'js');
export const logs = join(root, 'logs');

export const log = {
  info: join(logs, 'info.log'),
  error: join(logs, 'error.log'),
};

export const source = join(root, 'src');
export const backend = join(root, 'server');
export const entries = join(source, 'entries');

export const staticFiles = join(root, 'static');
export const media = join(staticFiles, 'media');

export const template = join(source, 'templates', isProduction ? 'production.html' : 'dev.html');

export const entry = {
  client: join(entries, 'client.tsx'),
  server: join(backend, 'index.ts'),
};


export const workBoxConfig = join(
  lib,
  isProduction ? 'sw-core.production.js' : 'sw-core.dev.js'
);
export const swCore = join(js, 'sw-core.js');
