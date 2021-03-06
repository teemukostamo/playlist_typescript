export const INIT_USER = 'INIT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';

export interface CurrentUser {
  token: string;
  username: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  level: number;
  status: number;
}

export interface LoginState {
  loading: boolean;
  currentUser: CurrentUser | null;
}

interface NewLoginAction {
  type: typeof LOGIN;
  data: CurrentUser;
}

interface InitUserAction {
  type: typeof INIT_USER;
  data: CurrentUser;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface UpdateCurrentUserAction {
  type: typeof UPDATE_CURRENT_USER;
  data: CurrentUser;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

export type LoginActionTypes =
  | SetLoadingAction
  | NewLoginAction
  | InitUserAction
  | LogoutAction
  | UpdateCurrentUserAction;
