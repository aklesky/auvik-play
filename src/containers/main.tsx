import { Column, Grid, Row } from '@/components/Grid';
import { Dashboard } from '@/containers/dashboard';
import { withAppIntl } from '@/hoc/i18n';
import React from 'react';

const Component = () => {
  return (
    <Grid fullHeight={true}>
      <Row fullHeight={true}>
        <Column fullHeight={true}>
          <>
            <div>Initial Setup 2</div>
            <Dashboard />
          </>
        </Column>
      </Row>
    </Grid>
  );
};

export const Main = withAppIntl(Component);
