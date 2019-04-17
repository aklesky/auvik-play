import { getSubscriptionClient } from '@/utils/apollo';
import { ActionTypes, EventTypes, StreamRequest } from '@/utils/enums';

export const onDataReceive = (dispatch: React.Dispatch<any>) => ({ subscriptionData }) => {
  const { data } = subscriptionData;
  dispatch({ type: ActionTypes.ADD_MEETUPS, payload: data.Meetups });
};

export const onPause = (dispatch: React.Dispatch<any>) => (streaming: boolean) => () => {
  const eventEmitter = getSubscriptionClient();
  if (streaming) {
    eventEmitter.sendMessage(4002, StreamRequest.stop, {
      event: EventTypes.StopStream
    });
    dispatch({ type: ActionTypes.STOP_RECEIVING, payload: false });
  } else {
    eventEmitter.sendMessage(4001, StreamRequest.start, {
      event: EventTypes.StartStream
    });
    dispatch({ type: ActionTypes.START_RECEIVING, payload: true });
  }
};
