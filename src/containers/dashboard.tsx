import { WithApolloClient } from '@/hoc/apollo';
import { withAppIntl } from '@/hoc/i18n';
import { withSubscription } from '@/hoc/subscription';
import subscription from '@/queries/meetups.graphql';
import { Messages } from '@/utils/enums';
import React from 'react';

const Container = () => {
  return <h1>Initial Data Container</h1>;
};

export const Dashboard = WithApolloClient(
  withSubscription(subscription, {
    channel: Messages.push,
  })(withAppIntl(Container))
);
