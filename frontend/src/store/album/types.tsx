export const GET_ONE_ALBUM = 'GET_ONE_ALBUM';
export const ADD_TRACK_TO_ALBUM = 'ADD_TRACK_TO_ALBUM';
export const GET_TRACKLIST_OF_ALBUM = 'GET_TRACKLIST_OF_ALBUM';
export const CLEAR_CURRENT_ALBUM = 'CLEAR_CURRENT_ALBUM';
export const SET_LOADING = 'SET_LOADING';
export const CHANGE_ARTIST_OF_ALBUM = 'CHANGE_ARTIST_OF_ALBUM';
export const MERGE_ALBUMS = 'MERGE_ALBUMS';

export interface Album {
  album_name: string;
  album_id: number;
  label: string | null;
  cat_id: string | null;
  spotify_id: string | null;
  year: string | null;
  artist_name: string;
  artist_id: number;
}

export interface TracklistItem {
  track_id: number;
  isrc: string | null;
  disc_no: number | null;
  track_no: number | null;
  track_title: string;
  artist_name: string;
  report_occurrence: number;
  length: number;
}

export interface AlbumState {
  currentAlbum: Album | null;
  tracklist: Array<TracklistItem>;
  loading: boolean;
}

export interface MergeAlbumsParams {
  type: string;
  mergeTo: number;
  merge: number;
  newName: string;
}

export interface UpdateAlbumParams {
  id: number;
  name: string;
  label: string | null;
  cat_id: string | null;
  year: string | number;
  spotify_id: string | null;
}

export interface ChangeArtistParams {
  album_id: number;
  artist_id: number;
  artist_name: string;
}

// album action types
interface GetOneAlbumAction {
  type: typeof GET_ONE_ALBUM;
  data: Album;
}

interface GetTracklistAction {
  type: typeof GET_TRACKLIST_OF_ALBUM;
  data: Array<TracklistItem>;
}

interface AddTrackToAlbumAction {
  type: typeof ADD_TRACK_TO_ALBUM;
  data: TracklistItem;
}

interface ClearCurrentAlbumAction {
  type: typeof CLEAR_CURRENT_ALBUM;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface ChangeArtistOfAlbumAction {
  type: typeof CHANGE_ARTIST_OF_ALBUM;
  data: ChangeArtistParams;
}

export type AlbumActionTypes =
  | GetOneAlbumAction
  | GetTracklistAction
  | AddTrackToAlbumAction
  | ClearCurrentAlbumAction
  | SetLoadingAction
  | ChangeArtistOfAlbumAction;
