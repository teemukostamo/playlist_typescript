import { LoginState } from './login/types';
import { NotificationState } from './notification/types';
import { UserState } from './user/types';

export interface ApplicationState {
  login: LoginState;
  notification: NotificationState;
  user: UserState;
}
