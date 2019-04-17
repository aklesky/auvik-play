import { ServerStyleSheet } from '@/theme/styled';
import { apolloClient } from '@/utils/apollo';
import co from 'co';
import { html } from 'config';
import fs from 'fs';
import { getDataFromTree } from 'react-apollo';
import { renderToNodeStream } from 'react-dom/server';
import { logger } from 'server/utils/logger';
import { Readable } from 'stream';
import { renderMetaTags } from './helmet';


class View extends Readable {
  public static getReadable(context) {
    return new View(context);
  }
  public context = null;

  constructor(context) {
    super();
    this.context = context;
    co.call(this, this.render).catch(context.onerror);
  }

// tslint:disable-next-line: no-empty
  public _read() {}

  public *render() {
    this.push('<!DOCTYPE html><html lang="en">');
    const data = fs.readFileSync(html, 'utf8');
    const [head, footer] = data.split('<!-- AppRoot -->');

    const sheet = new ServerStyleSheet();
    const { staticApp } = require('@/entries/server');

    const apollo = apolloClient(process.browser);
    const app = staticApp(apollo, this.context.url);

    const jsx = sheet.collectStyles(app);

    const dataFromTree = yield done =>
      getDataFromTree(jsx).then(() => {
        logger.info('React Queries have been collected.');
        const extracted = apollo.extract();
        const metaTags = renderMetaTags();
        this.push(head.replace('<!-- metaTags -->', metaTags));
        return done(
          null,
          `<script>window.__APOLLO_STATE__=${JSON.stringify(extracted).replace(
            /</g,
            '\\u003c'
          )};</script>`
        );
      });

    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));

    stream.on('data', (chunk: string) => {
      this.push(chunk);
    });

    stream.on('end', () => {
      this.push(footer.replace('<!-- AppState -->', dataFromTree));
      this.push('</html>');
      this.push(null);
    });
  }
}

export default View;
