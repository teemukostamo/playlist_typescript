import { Action, Reducer } from 'redux';
import {
  INIT_USER_LIST,
  SET_LOADING,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  UserState,
  UserActionTypes,
} from './types';

const initialState: UserState = {
  users: [],
  loading: false,
};

const userReducer: Reducer<UserState, Action> = (
  state = initialState,
  action: UserActionTypes
) => {
  switch (action.type) {
    case INIT_USER_LIST:
      return {
        ...state,
        users: action.data,
        loading: false,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.data],
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: action.data,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.data),
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
