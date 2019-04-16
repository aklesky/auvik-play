import { Universal } from '@/app';
import { theme } from '@/theme';
import { client } from '@/utils/apollo';
import fonts from '@/utils/fonts';
import sw from '@/utils/sw';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

sw();
fonts();

const renderApp = apollo => {
  const Root = (
    <BrowserRouter>
      <Universal client={apollo} theme={theme} />
    </BrowserRouter>
  );

  if (process.env.NODE_ENV === 'production') {
    ReactDOM.hydrate(Root, document.getElementById('root'));
  } else {
    ReactDOM.render(Root, document.getElementById('root'));
  }
};

renderApp(client((process as any).browser));

if ((module as any).hot) {
  (module as any).hot.accept('@/app', () => {
    renderApp(client((process as any).browser));
  });
}
