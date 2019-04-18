import { ILogsState } from '@/interfaces/ILog';
import { ActionTypes } from '@/utils/enums';

export const initialState: ILogsState = {
  logs: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOGS:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    default:
      return state;
  }
};
