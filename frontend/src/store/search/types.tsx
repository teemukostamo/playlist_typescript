export const AUTOCOMPLETE_RESULTS = 'AUTOCOMPLETE_RESULTS';
export const ADVANCED_RESULTS = 'ADVANCED_RESULTS';
export const SORT_ADVANCED_RESULTS = 'SORT_ADVANCED_RESULTS';
export const GET_DISCOGS_DATA = 'GET_DISCOGS_DATA';
export const CLEAR_DISCOGS_DATA = 'CLEAR_DISCOGS_DATA';
export const TOP_100 = 'TOP_100';
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING';
export const GET_CHANGE_ALBUM_OPTIONS = 'GET_CHANGE_ALBUM_OPTIONS';
export const GET_CHANGE_ARTIST_OPTIONS = 'GET_CHANGE_ARTIST_OPTIONS';
export const RESET_CHANGE_ALBUM_OPTIONS = 'RESET_CHANGE_ALBUM_OPTIONS';
export const RESET_CHANGE_ARTIST_OPTIONS = 'RESET_CHANGE_ARTIST_OPTIONS';
export const MERGE_ALBUMS = 'MERGE_ALBUMS';
export const MERGE_ARTISTS = 'MERGE_ARTISTS';
export const MERGE_TRACKS = 'MERGE_TRACKS';

export interface AdvancedResultsType {
  artist_name: string;
  artist_id: number;
  album_name: string;
  album_id: number;
  track_title: string;
  track_id: number;
  length: number;
  program_date: string;
  report_id: number;
}

export interface AdvancedSearchQueryType {
  kind: string;
  query: string;
}

export interface Top100Type {
  count: number;
  track_id: number;
  track_title: string;
  album: string;
  artist: string;
  album_id: number;
  artist_id: number;
  length: number;
}

export interface Top100QueryType {
  list: string;
  start_date: string;
  end_date: string;
}

export type SortAdvancedResultsType = number | null;

export interface DiscogsDataType {
  year: string;
  cat_id: string;
  label: string;
}

export interface DiscogsQueryType {
  album: string;
  artist: string;
}

export interface MergeParamsType {
  type: string;
  merge: number;
  mergeTo: number;
}

export interface MergeTrackParamsType {
  type: string;
  merge: number;
  mergeTo: number;
  newName: string;
}

export interface MergeArtistsParamsType {
  type: string;
  mergeTo: number;
  merge: number;
  newName: string;
}

export interface AdvancedSearchParamsType {
  query: string;
  kind: string;
}

export interface SearchState {
  top100: Array<Top100Type>;
  top100Query: Top100QueryType | null;
  advancedResults: Array<AdvancedResultsType>;
  sortAdvancedResults: number | null;
  loading: boolean;
  discogsData: DiscogsDataType | null;
}

// search action types
interface AdvancedResultsAction {
  type: typeof ADVANCED_RESULTS;
  data: Array<AdvancedResultsType>;
}

interface Top100Action {
  type: typeof TOP_100;
  data: Array<Top100Type>;
  query: Top100QueryType;
}

interface SortAdvancedResultsAction {
  type: typeof SORT_ADVANCED_RESULTS;
  data: SortAdvancedResultsType;
}

interface SetLoadingAction {
  type: typeof SET_SEARCH_LOADING;
}

interface GetDiscogsDataAction {
  type: typeof GET_DISCOGS_DATA;
  data: DiscogsDataType;
}

interface ClearDiscogsDataAction {
  type: typeof CLEAR_DISCOGS_DATA;
}

interface MergeTracksAction {
  type: typeof MERGE_TRACKS;
  data: MergeTrackParamsType;
}

interface MergeArtistsAction {
  type: typeof MERGE_ARTISTS;
  data: MergeArtistsParamsType;
}

export type SearchActionTypes =
  | AdvancedResultsAction
  | Top100Action
  | SortAdvancedResultsAction
  | SetLoadingAction
  | GetDiscogsDataAction
  | ClearDiscogsDataAction
  | MergeTracksAction
  | MergeArtistsAction;
