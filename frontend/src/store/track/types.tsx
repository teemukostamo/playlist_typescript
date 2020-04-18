export const GET_ONE_TRACK = 'GET_ONE_TRACK';
export const GET_ONE_TRACK_HISTORY = 'GET_ONE_TRACK_HISTORY';
export const CLEAR_CURRENT_TRACK = 'CLEAR_CURRENT_TRACK';
export const SET_LOADING = 'SET_LOADING';
export const CHANGE_ALBUM = 'CHANGE_ALBUM';
export const CHANGE_ARTIST = 'CHANGE_ARTIST';
export const ADD_NEW_TRACK = 'ADD_NEW_TRACK';
export const ADD_TRACK_TO_ALBUM = 'ADD_TRACK_TO_ALBUM';
export const UPDATE_TRACK = 'UPDATE_TRACK';
export const REMOVE_CURRENT_TRACK = 'REMOVE_CURRENT_TRACK';
export const MERGE_TRACKS = 'MERGE_TRACKS';
export const ADD_TRACK_TO_REPORT = 'ADD_TRACK_TO_REPORT';

export interface Track {
  track_title: string;
  artist: string;
  album: string;
  track_id: number;
  album_id: number;
  artist_id: number;
  label: string | null;
  cat_id: string | null;
  lengtt: number;
  disc_no: number | null;
  track_no: number | null;
  people: string | null;
  isrc: string | null;
  year: string | null;
  comment: string | null;
  record_country: string | null;
  country: number;
}

export interface AddTrackToDbType {
  track_title: string;
  artist_name: string;
  album_name: string;
  label: string;
  cat_id: string;
  year: string;
  disc_no: number;
  track_no: number;
  length: number;
  country: number;
  record_country: string;
  people: string | null;
  comment: string | null;
  isrc: string | null;
  user_id: number;
}

export interface AddTrackToDbAndReportType {
  track_title: string;
  artist_name: string;
  album_name: string;
  label: string;
  cat_id: string;
  year: string;
  disc_no: number;
  track_no: number;
  length: number;
  country: number;
  record_country: string;
  people: string | null;
  comment: string | null;
  isrc: string | null;
  report_id: number;
  user_id: number;
  sortable_rank: number;
}

export interface ChangeAlbumParams {
  track_id: number;
  album_id: number;
  album_name: string;
}

export interface ChangeArtistParams {
  track_id: number;
  artist_id: number;
  artist_name: string;
}

export interface PlayHistoryEntry {
  program_name: string;
  program_id: number;
  report_id: number;
  program_date: string;
  track_id: number;
}

export interface ChangeArtist {
  artist_id: number;
  artist: string;
}

export interface ChangeAlbum {
  album_id: number;
  album_name: string;
}

export interface MergeTrackParamsType {
  type: string;
  merge: number;
  mergeTo: number;
  newName: string;
}

export interface TrackState {
  currentTrack: Track | null;
  playHistory: Array<PlayHistoryEntry>;
  loading: boolean;
}

// track action types
interface GetOneTrackAction {
  type: typeof GET_ONE_TRACK;
  data: Track;
}

interface GetOneTrackHistoryAction {
  type: typeof GET_ONE_TRACK_HISTORY;
  data: Array<PlayHistoryEntry>;
}

interface ClearCurrentTrackAction {
  type: typeof CLEAR_CURRENT_TRACK;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface ChangeAlbumAction {
  type: typeof CHANGE_ALBUM;
  data: ChangeAlbum;
}

interface ChangeArtistAction {
  type: typeof CHANGE_ARTIST;
  data: ChangeArtist;
}

export type TrackActionTypes =
  | GetOneTrackAction
  | GetOneTrackHistoryAction
  | ClearCurrentTrackAction
  | SetLoadingAction
  | ChangeAlbumAction
  | ChangeArtistAction;
