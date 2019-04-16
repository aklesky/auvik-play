import GlobalStyles from '@/theme/globalStyle';
import { description, name } from 'i18n/en.json';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'styled-components';

import { helmetContext } from '@/utils/helmet';

export const Universal = props => {
  const { theme, client } = props;
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{name}</title>
        <meta name='description' content={description} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <main className='test'>
          <GlobalStyles />
          <ApolloProvider client={client}>
            <Switch>
              <Route exact={true} path='/' component={() => <div>Initial Setup</div>} />
            </Switch>
          </ApolloProvider>
        </main>
      </ThemeProvider>
    </HelmetProvider>
  );
};
