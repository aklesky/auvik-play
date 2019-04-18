import GlobalStyles from '@/theme/globalStyle';
import { helmetContext } from '@/utils/helmet';
import { ApolloClient } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { Meetups } from './containers/meetups';
import { withIntlProvider } from './hoc/i18n';
import { ITheme } from './interfaces/ITheme';

const App: React.SFC<{
  theme: ITheme;
  client: ApolloClient<any>;
  i18n: any;
}> = props => {
  const { theme, client, i18n } = props;
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{i18n.name}</title>
        <meta name='description' content={i18n.description} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <main className='test'>
          <GlobalStyles />
          <ApolloProvider client={client}>
            <Switch>
              <Route exact={true} path='/' component={Meetups} />
            </Switch>
          </ApolloProvider>
        </main>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export const Universal = withIntlProvider(App);
