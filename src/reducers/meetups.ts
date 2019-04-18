import { IMeetupState } from '@/interfaces/IMeetup';
import { ActionTypes } from '@/utils/enums';

export const initialState: IMeetupState = {
  state: false,
  current: {
    venue: {
      lat: '35.188074',
      lon: '-40.62508'
    }
  },
  meetups: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MEETUPS:
      return {
        ...state,
        meetups: [...state.meetups, action.payload],
        current: action.payload
      };
    case ActionTypes.START_RECEIVING:
      return {
        ...state,
        state: action.payload
      };
    case ActionTypes.STOP_RECEIVING:
      return {
        ...state,
        state: action.payload
      };
    default:
      return state;
  }
};
