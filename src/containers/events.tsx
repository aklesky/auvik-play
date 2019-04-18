import { Column, Grid, Row } from '@/components/Grid';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/Table';
import { withAppIntl } from '@/hoc/i18n';
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Component = props => {
  const { i18n, data } = props;
  return (
    <Grid fullHeight={true} fullWidth={true}>
      <Row fullWidth={true} alignItems='center'>
        <Column fullWidth={true}>
          <Table>
            <THead>
              <Tr>
                <Th>{i18n.event}</Th>
                <Th>{i18n.date}</Th>
              </Tr>
            </THead>
            <TBody>
              {data.reverse().map((item, index: number) => (
                <Tr key={`${item.rsvp_id}-${index}`}>
                  <Td>{item.event.event_name}</Td>
                  <Td>{item.event.friendly_date}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Column>
      </Row>
    </Grid>
  );
};

export const Events = withAppIntl(Component);
