import { Dispatch } from 'redux';

export const setNotification = (message: string, type: 'success' | 'fail') => {
  const content = {
    message,
    type,
  };
  return async (dispatch: Dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, 3000);
  };
};
