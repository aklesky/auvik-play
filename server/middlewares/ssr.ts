import { View } from 'server/utils/react';

export const useServerSideRendering = async ctx => {
  ctx.type = 'html';
  ctx.body = View.getReadable(ctx);
};
