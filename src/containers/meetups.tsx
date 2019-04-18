import { onDataReceive, onPause } from '@/actions/meetups';
import { Button } from '@/components/Button';
import { Column, Grid, Row } from '@/components/Grid';
import { Header } from '@/components/Header';
import { Map } from '@/components/Map';
import { MarkerSub } from '@/components/Marker';
import { Events } from '@/containers/events';
import { Logs } from '@/containers/logs';
import { withAppIntl } from '@/hoc/i18n';
import { initialState, reducer } from '@/reducers/meetups';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer } from 'react';

const Component = props => {
  const { i18n } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Grid fullHeight={true} fullWidth={true}>
      <Row>
        <Column xs={10} sm={10} md={10} lg={10}>
          <Header>{i18n.dashboard}</Header>
        </Column>
        <Column xs={2} sm={2} md={2} lg={2}>
          <Button
            onClick={onPause(dispatch)(state.state)}
            aria-label={state.state ? i18n.pause : i18n.start}
          >
            <FontAwesomeIcon icon={state.state ? faPause : faPlay} />
          </Button>
        </Column>
      </Row>
      <Row>
        <Column xs={12} sm={12} md={12} lg={12}>
          <Map current={state.current}>
            <MarkerSub onDataReceive={onDataReceive(dispatch)} />
          </Map>
        </Column>
      </Row>
      <Row fullWidth={true}>
        <Column xs={12} sm={12} md={6} lg={6}>
          <Events data={state.meetups} />
        </Column>
        <Column xs={12} sm={12} md={6} lg={6}>
          <Logs />
        </Column>
      </Row>
    </Grid>
  );
};

export const Meetups = withAppIntl(Component);

export default Meetups;
