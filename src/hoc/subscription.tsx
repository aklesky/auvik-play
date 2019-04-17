import React from 'react';
import Subscription from 'react-apollo/Subscriptions';

export const withSubscription = (query, variables) => Component => props => {
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
          return '...Loading...';
        }
        return <Component {...data} {...props} />;
      }}
    </Subscription>
  );
};
