import { Universal } from '@/app';
import { theme } from '@/theme';
import { apolloClient } from '@/utils/apollo';
import fonts from '@/utils/fonts';
import sw from '@/utils/sw';
import { loadableReady } from '@loadable/component';
import { ApolloClient } from 'apollo-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
sw();
fonts();

const renderApp = (apollo: ApolloClient<any>) => {
  const Root = (
    <BrowserRouter>
      <Universal client={apollo} theme={theme} />
    </BrowserRouter>
  );
  loadableReady(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactDOM.hydrate(Root, document.getElementById('root'));
    } else {
      ReactDOM.render(Root, document.getElementById('root'));
    }
  });
};

renderApp(apolloClient(process.browser));

if (module.hot) {
  module.hot.accept('@/app', () => {
    renderApp(apolloClient(process.browser));
  });
}
