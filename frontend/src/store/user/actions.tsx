import { Dispatch } from 'redux';
import userService from './services';
import {
  SET_LOADING,
  INIT_USER_LIST,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  UserToAdd,
  UserToUpdate,
} from './types';

export const initializeUsers = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const users = await userService.getAll();
    dispatch({
      type: INIT_USER_LIST,
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createUser = (userToAdd: UserToAdd) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const newUser = await userService.createUser(userToAdd);
    dispatch({
      type: CREATE_USER,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (userToUpdate: UserToUpdate) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await userService.updateUser(userToUpdate);
    const users = await userService.getAll();
    dispatch({
      type: UPDATE_USER,
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    dispatch({
      type: DELETE_USER,
      data: id,
    });
    await userService.deleteUser(id);
  } catch (error) {
    console.log(error);
  }
};
