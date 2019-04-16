import { client } from 'config/paths';
import fs from 'fs';
import Koa from 'koa';
import Router from 'koa-router';
import { resolve } from 'path';

export const staticWebpack = async (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) => {
  const html = fs.readFileSync(resolve(client, 'index.html'));
  ctx.type = 'html';
  ctx.body = html;
};
