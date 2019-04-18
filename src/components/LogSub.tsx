import { Header } from '@/components/Header';
import { Span } from '@/components/Span';
import { withAppIntl } from '@/hoc/i18n';
import { withSubscription } from '@/hoc/subscription';
import subscription from '@/queries/logs.graphql';
import { withTheme } from '@/theme/styled';
import React from 'react';

const Container = props => {
  const { Logs, i18n } = props;
  return (
    <Header background={props.theme.colors.red} color={props.theme.colors.white}>
      <Span color={props.theme.colors.background}>{i18n.last}</Span>{' '}
      <Span>
        {Logs.time} - {Logs.message}
      </Span>
    </Header>
  );
};
export const LogSub = withSubscription(subscription, null)(withAppIntl(withTheme(Container)));
