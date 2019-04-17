import i18n from 'i18n/en.json';
import React from 'react';

export const IntlContext = React.createContext({});

export const withIntlProvider = (Component: React.ElementType) => (props:any) => {
  const WrappedComponent = withAppIntl(Component);
  return (
    <IntlContext.Provider value={i18n}>
      <WrappedComponent {...props} />
    </IntlContext.Provider>
  );
};

export const withAppIntl = (Component: React.ElementType) => (props:any) => (
  <IntlContext.Consumer>{context => <Component i18n={context} {...props} />}</IntlContext.Consumer>
);
