import { getSubscriptionClient } from '@/utils/apollo';
import { StreamRequest } from '@/utils/enums';
import React, { useState } from 'react';
import Subscription from 'react-apollo/Subscriptions';

export const withSubscription = (query, variables) => Component => props => {
  const [subscriptionState, setSubscriptionState] = useState(false);
  const onPause = state => () => {
    setSubscriptionState(!state);
    const eventEmitter = getSubscriptionClient();
    if (state) {
      eventEmitter.sendMessage(4002, StreamRequest.stop);
    } else {
      eventEmitter.sendMessage(4001, StreamRequest.start);
    }
  };

  return (
    <>
      <button onClick={onPause(subscriptionState)}>Pause</button>
      <Subscription
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
    </>
  );
};
