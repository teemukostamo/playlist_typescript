import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import loginReducer from './login/reducer';
import { LoginState } from './login/types';
import notificationReducer from './notification/reducer';
import { NotificationState } from './notification/types';
import userReducer from './user/reducer';
import { UserState } from './user/types';

export interface ApplicationState {
  login: LoginState;
  notification: NotificationState;
  user: UserState;
}

const reducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
  user: userReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
