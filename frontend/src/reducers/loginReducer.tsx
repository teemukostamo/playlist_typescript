const INIT_USER = 'INIT_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_LOADING = 'SET_LOADING';

const initialState: LoginState = {
  loading: false,
  currentUser: null,
};

interface CurrentUser {
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

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

type LoginActionTypes =
  | SetLoadingAction
  | NewLoginAction
  | InitUserAction
  | LogoutAction;

const loginReducer = (state = initialState, action: LoginActionTypes) => {
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
