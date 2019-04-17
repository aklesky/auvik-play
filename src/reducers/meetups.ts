import { IMeetupState } from '@/interfaces/IMeetup';
import { ActionTypes } from '@/utils/enums';

export const initialState: IMeetupState = {
  state: false,
  meetups: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MEETUPS:
      return {
        ...state,
        meetups: [...state.meetups, action.payload],
      };
    case ActionTypes.START_RECEIVING:
      return {
        ...state,
        state: action.payload,
      };
      case ActionTypes.STOP_RECEIVING:
      return {
        ...state,
        state: action.payload,
      };
    default:
      return state;
  }
};
