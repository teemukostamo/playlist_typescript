import { Action, Reducer } from 'redux';
import {
  LoginActionTypes,
  LoginState,
  INIT_USER,
  LOGIN,
  LOGOUT,
  SET_LOADING,
} from './types';

const initialState: LoginState = {
  loading: false,
  currentUser: null,
};

const loginReducer: Reducer<LoginState, Action> = (
  state = initialState,
  action: LoginActionTypes
) => {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        currentUser: action.data,
        loading: false,
      };
    case LOGIN:
      return {
        ...state,
        currentUser: action.data,
        loading: false,
      };
    case LOGOUT:
      return initialState;
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
