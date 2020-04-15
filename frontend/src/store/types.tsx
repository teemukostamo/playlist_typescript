import { LoginState } from './login/types';
import { NotificationState } from './notification/types';
import { ProgramState } from './program/types';
import { UserState } from './user/types';

export interface ApplicationState {
  login: LoginState;
  notification: NotificationState;
  program: ProgramState;
  user: UserState;
}
