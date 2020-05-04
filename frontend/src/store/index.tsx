import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import albumReducer from './album/reducer';
import artistReducer from './artist/reducer';
import loginReducer from './login/reducer';
import notificationReducer from './notification/reducer';
import programReducer from './program/reducer';
import reportReducer from './report/reducer';
import reportListReducer from './reportList/reducer';
import searchReducer from './search/reducer';
import trackReducer from './track/reducer';
import userReducer from './user/reducer';

import { ApplicationState } from './types';

const appReducer = combineReducers({
  album: albumReducer,
  artist: artistReducer,
  login: loginReducer,
  notification: notificationReducer,
  program: programReducer,
  report: reportReducer,
  reportList: reportListReducer,
  search: searchReducer,
  track: trackReducer,
  user: userReducer,
});

const rootReducer = (state: ApplicationState | undefined, action: Action) => {
  if (action.type === 'LOGOUT') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
