import { ActionTypes } from '@/utils/enums';

export const onDataReceive = (dispatch: React.Dispatch<any>) => ({ subscriptionData }) => {
  const { data } = subscriptionData;
  setTimeout(() => {
    dispatch({ type: ActionTypes.ADD_LOGS, payload: data.Logs });
  }, 1000);
};

