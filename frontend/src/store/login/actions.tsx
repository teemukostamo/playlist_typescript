import loginService from './services';
import {
  INIT_USER,
  LOGIN,
  LOGOUT,
  SET_LOADING,
  UPDATE_CURRENT_USER,
  CurrentUser,
} from './types';
import { Dispatch } from 'redux';

import albumService from '../album/services';
import artistService from '../artist/services';
import programService from '../program/services';
import reportService from '../report/services';
import reportListService from '../reportList/services';
import searchService from '../search/services';
import trackService from '../track/services';
import userService from '../user/services';

interface NewLogin {
  username: string;
  password: string;
}

export const initializeUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // set token for logged in user
      userService.setToken(user.token);
      reportService.setToken(user.token);
      reportListService.setToken(user.token);
      programService.setToken(user.token);
      searchService.setToken(user.token);
      trackService.setToken(user.token);
      artistService.setToken(user.token);
      albumService.setToken(user.token);
      dispatch({
        type: INIT_USER,
        data: user,
      });
    }
  } catch (err) {
    // dispatch({
    //   type: LOGIN_ERROR,
    //   payload: err.response.statusText,
    // });
    console.log('error initializing user', err);
  }
};

export const newLogin = (user: NewLogin) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const newUser = await loginService.login(user);
    window.localStorage.setItem('loggedUser', JSON.stringify(newUser));
    dispatch({
      type: LOGIN,
      data: newUser,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    const content = {
      message: 'wrong username or password',
      type: 'fail',
    };
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, 3000);
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  window.localStorage.removeItem('loggedUser');
  dispatch({
    type: LOGOUT,
  });
};

export const updateCurrentUser = (updatedCurrentUser: CurrentUser) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: UPDATE_CURRENT_USER,
    data: updatedCurrentUser,
  });
};
