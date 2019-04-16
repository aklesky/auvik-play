import { ServerStyleSheet } from '@/theme/styled';
import { renderToNodeStream } from 'react-dom/server';
import { logger } from 'server/utils/logger';

export const withStyledComponents = App => {
  const sheet = new ServerStyleSheet();
  try {
    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(App));
    sheet.getStyleTags();
    return {
      stream
    };
  } catch (e) {
    logger.error(e.message);
    return false;
  } finally {
    sheet.seal();
  }
};
