import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import loginReducer from './login/reducer';
import notificationReducer from './notification/reducer';
import programReducer from './program/reducer';
import userReducer from './user/reducer';

const reducer = combineReducers({
  login: loginReducer,
  notification: notificationReducer,
  program: programReducer,
  user: userReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
