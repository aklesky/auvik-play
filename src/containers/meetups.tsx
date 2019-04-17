import { onDataReceive, onPause } from '@/actions/meetups';
import { Button } from '@/components/Button';
import { Column, Grid, Row } from '@/components/Grid';
import { Header } from '@/components/Header';
import { GoogleMapComponent } from '@/components/Map';
import { MarkerSub } from '@/components/Marker';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/Table';
import { withAppIntl } from '@/hoc/i18n';
import { initialState, reducer } from '@/reducers/meetups';
import React, { useReducer } from 'react';

const Component = props => {
  const { i18n } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Grid fullHeight={true}>
      <Row fullHeight={true}>
        <Column fullHeight={true}>
          <>
            <Header>{i18n.dashboard}</Header>
            <Button onClick={onPause(dispatch)(state.state)}>
              {state.state ? i18n.pause : i18n.start}
            </Button>
            <GoogleMapComponent>
              <MarkerSub onDataReceive={onDataReceive(dispatch)} />
            </GoogleMapComponent>

            <Table>
              <THead>
                <Tr>
                  <Th>{i18n.event}</Th>
                  <Th>{i18n.date}</Th>
                </Tr>
              </THead>
              <TBody>
                {state.meetups.map((item, index: number) => (
                  <Tr key={`${item.rsvp_id}-${index}`}>
                    <Td>{item.event.event_name}</Td>
                    <Td>{item.event.time}</Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </>
        </Column>
      </Row>
    </Grid>
  );
};

export const Meetups = withAppIntl(Component);
