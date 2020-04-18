import { AlbumState } from './album/types';
import { ArtistState } from './artist/types';
import { LoginState } from './login/types';
import { NotificationState } from './notification/types';
import { ProgramState } from './program/types';
import { ReportState } from './report/types';
import { ReportListState } from './reportList/types';
import { SearchState } from './search/types';
import { TrackState } from './track/types';
import { UserState } from './user/types';

export interface ApplicationState {
  album: AlbumState;
  artist: ArtistState;
  login: LoginState;
  notification: NotificationState;
  program: ProgramState;
  report: ReportState;
  reportList: ReportListState;
  search: SearchState;
  track: TrackState;
  user: UserState;
}
