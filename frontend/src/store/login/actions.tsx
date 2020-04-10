import loginService from './services';
import { SET_LOADING } from '../../types';
import { Dispatch } from 'redux';

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
      // userService.setToken(user.token);
      // reportService.setToken(user.token);
      // programService.setToken(user.token);
      // searchService.setToken(user.token);
      // trackService.setToken(user.token);
      // artistService.setToken(user.token);
      // albumService.setToken(user.token);
      dispatch({
        type: 'INIT_USER',
        data: user,
      });
    }
  } catch (err) {
    // dispatch({
    //   type: LOGIN_ERROR,
    //   payload: err.response.statusText,
    // });
    console.log(err);
  }
};

export const newLogin = (user: NewLogin) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const newUser = await loginService.login(user);
    console.log(newUser);
    window.localStorage.setItem('loggedUser', JSON.stringify(newUser));

    dispatch({
      type: 'LOGIN',
      data: newUser,
      loading: false,
    });
  } catch (error) {
    console.log(error);
    // const content = {
    //   message: 'wrong username or password',
    //   type: 'fail'
    // };
    // dispatch({
    //   type: 'SET_NOTIFICATION',
    //   data: content
    // });
    // setTimeout(() => {
    //   dispatch({
    //     type: 'CLEAR_NOTIFICATION'
    //   });
    // }, 3000);
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  window.localStorage.removeItem('loggedUser');
  dispatch({
    type: 'LOGOUT',
  });
};
