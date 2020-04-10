import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
import loginReducer from './login/reducer';
import { LoginState } from './login/types';

export interface ApplicationState {
  login: LoginState;
}

const reducer = combineReducers({
  login: loginReducer,
  users: userReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
