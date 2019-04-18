import React from 'react';
import Subscription from 'react-apollo/Subscriptions';

export const withSubscription = (query, variables?: any) => Component => props => {
  return (
    <Subscription
      onSubscriptionData={props.onDataReceive}
      subscription={query}
      variables={{
        ...variables
      }}
    >
      {({ data, loading }) => {
        if (loading) {
          return null;
        }
        return <Component {...data} {...props} />;
      }}
    </Subscription>
  );
};
