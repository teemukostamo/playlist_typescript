import { UserState, SetLoadingAction } from '../types';

const initialState: UserState = {
  loading: false,
  current: null,
};

const userReducer = (state = initialState, action: SetLoadingAction) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
