import KoaRouter from 'koa-router';
import path from 'path';
import fs from 'fs';
import { js, client } from 'config/paths';

export const router = new KoaRouter();
router.get('/sw.js', async ctx => {
  ctx.type = 'text/javascript';
  ctx.body = fs.readFileSync(path.resolve(js, 'sw.js'));
});
router.get('/robots.txt', async ctx => {
  ctx.type = 'text';
  ctx.body = fs.readFileSync(path.resolve(client, 'robots.txt'));
});
