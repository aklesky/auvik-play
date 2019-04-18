import { onDataReceive } from '@/actions/logs';
import { Console } from '@/components/Console';
import { Column, Grid, Row } from '@/components/Grid';
import { Header } from '@/components/Header';
import { LogSub } from '@/components/LogSub';
import { Span } from '@/components/Span';
import { withAppIntl } from '@/hoc/i18n';
import { initialState, reducer } from '@/reducers/logs';
import { withTheme } from '@/theme/styled';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer } from 'react';

const Component = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = props;
  return (
    <Grid fullHeight={true} fullWidth={true}>
      <Row fullWidth={true} alignItems='center'>
        <Column xs={12} sm={12} md={12} lg={12}>
          <Header>{i18n.logs}</Header>
        </Column>
      </Row>
      <Row fullWidth={true} alignItems='center'>
        <Column fullHeight={true}>
          <>
            <LogSub onDataReceive={onDataReceive(dispatch)} />
            <Console>
              <>
                {state.logs.map((item, index) => (
                  <p key={`${item.time}-${index}`}>
                    <>
                      <Span color={props.theme.colors.green}>[{item.time}]: </Span>
                      <Span>{item.message}</Span>
                    </>
                  </p>
                ))}
                <footer>
                  <FontAwesomeIcon icon={faAngleRight} />
                </footer>
              </>
            </Console>
          </>
        </Column>
      </Row>
    </Grid>
  );
};

export const Logs = withAppIntl(withTheme(Component));
