import { Action, Reducer } from 'redux';
import { NotificationState, NotificationActionTypes } from './types';

const initialState: NotificationState = {
  message: null,
  type: null,
};

const notificationReducer: Reducer<NotificationState, Action> = (
  state = initialState,
  action: NotificationActionTypes
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;

    case 'CLEAR_NOTIFICATION':
      return initialState;

    default:
      return state;
  }
};

export default notificationReducer;
