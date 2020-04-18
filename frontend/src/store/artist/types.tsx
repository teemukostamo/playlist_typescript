export const GET_ONE_ARTIST = 'GET_ONE_ARTIST';
export const GET_ALBUM_LIST_BY_ARTIST = 'GET_ALBUM_LIST_BY_ARTIST';
export const CLEAR_CURRENT_ARTIST = 'CLEAR_CURRENT_ARTIST';
export const MERGE_ARTISTS = 'MERGE_ARTISTS';
export const SET_LOADING = 'SET_LOADING';

export interface Artist {
  id: number;
  name: string;
  spotify_id: string | null;
  old_id: number | null;
  user_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface AlbumListItem {
  album_id: number;
  artist_id: number;
  name: string;
  identifier: string | null;
  artist_name: string;
  artist_spotify_id: string | null;
  track_count: number;
  report_occurrence: number;
}

export interface UpdateArtistParams {
  id: number;
  name: string;
  spotify_id: string | null;
}

export interface MergeArtistsParams {
  type: string;
  mergeTo: number;
  merge: number;
  newName: string;
}

export interface ArtistState {
  currentArtist: Artist | null;
  albumList: Array<AlbumListItem>;
  loading: boolean;
}

// artist action types
interface GetOneArtistAction {
  type: typeof GET_ONE_ARTIST;
  data: Artist;
}

interface GetAlbumListByArtistAction {
  type: typeof GET_ALBUM_LIST_BY_ARTIST;
  data: Array<AlbumListItem>;
}

interface ClearCurrentArtistAction {
  type: typeof CLEAR_CURRENT_ARTIST;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

export type ArtistActionTypes =
  | GetOneArtistAction
  | GetAlbumListByArtistAction
  | ClearCurrentArtistAction
  | SetLoadingAction;
