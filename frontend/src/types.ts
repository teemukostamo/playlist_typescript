export const SET_LOADING = 'SET_LOADING';

export interface SetLoadingAction {
  type: typeof SET_LOADING;
}

export interface ReportTracks {
  length: number;
}

type CurrentUser = {
  username: string;
  id: number;
  iat: number;
};

export interface UserState {
  loading: boolean;
  current?: CurrentUser | null;
}
