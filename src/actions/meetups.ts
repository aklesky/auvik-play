import { getSubscriptionClient } from '@/utils/apollo';
import { ActionTypes, EventTypes, StreamRequest } from '@/utils/enums';

export const onDataReceive = (dispatch: React.Dispatch<any>) => ({ subscriptionData }) => {
  const { data } = subscriptionData;
  setTimeout(() => {
    dispatch({ type: ActionTypes.ADD_MEETUPS, payload: data.Meetups });
  }, 1500);
};

export const onPause = (dispatch: React.Dispatch<any>) => (streaming: boolean) => () => {
  const eventEmitter = getSubscriptionClient();
  if (streaming) {
    setTimeout(() => {
      eventEmitter.sendMessage(4002, StreamRequest.stop, {
        event: EventTypes.StopStream
      });
    }, 300);

    dispatch({ type: ActionTypes.STOP_RECEIVING, payload: false });
  } else {
    setTimeout(() => {
      eventEmitter.sendMessage(4001, StreamRequest.start, {
        event: EventTypes.StartStream
      });
      dispatch({ type: ActionTypes.START_RECEIVING, payload: true });
    }, 300);

  }
};
