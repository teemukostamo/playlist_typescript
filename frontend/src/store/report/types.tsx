import { Track } from '../track/types';
export const GET_ONE_REPORT = 'GET_ONE_REPORT';
export const GET_REPORT_DETAILS = 'GET_REPORT_DETAILS';
export const GET_PLAYLOG_TRACKS = 'GET_PLAYLOG_TRACKS';
export const ADD_NEW_TRACK = 'ADD_NEW_TRACK';
export const UPDATE_TRACK = 'UPDATE_TRACK';
export const SET_EDIT_TRACK_ID = 'SET_EDIT_TRACK_ID';
export const GET_ONE_TRACK = 'GET_ONE_TRACK';
export const REMOVE_CURRENT_TRACK = 'REMOVE_CURRENT_TRACK';
export const DELETE_TRACK_FROM_REPORT = 'DELETE_TRACK_FROM_REPORT';
export const CHECK_FOR_DELETE = 'CHECK_FOR_DELETE';
export const UNCHECK_FOR_DELETE = 'UNCHECK_FOR_DELETE';
export const CLEAR_CHECKED_FOR_DELETE = 'CLEAR_CHECKED_FOR_DELETE';
export const CREATE_REPORT = 'CREATE_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const CLEAR_CURRENT_REPORT = 'CLEAR_CURRENT_REPORT';
export const SET_LOADING = 'SET_LOADING';
export const ADD_TRACK_TO_REPORT = 'ADD_TRACK_TO_REPORT';
export const CREATE_NEW_PROGRAM_ON_NEW_REPORT =
  'CREATE_NEW_PROGRAM_ON_NEW_REPORT';
// REPORT_ERROR

export interface ReportItem {
  sortable_rank: number;
  artist_name: string;
  track_title: string;
  length: number;
  track_id: number;
  artist_id: number;
  album_id: number;
  album_name: string;
  disc_no: number | null;
  track_no: number | null;
  cat_id: string | null;
  country: number;
  isrc: string | null;
  label: string | null;
  people: string | null;
  record_country: string | null;
  year: string | null;
  report_track_id: number;
}

export interface PlaylogItem {
  track_id: number;
  artist_id: number;
  album_id: number;
  track_title: string;
  artist_name: string;
  album_name: string;
  label: string | null;
  cat_id: string | null;
  year: string | null;
  disc_no: string | null;
  track_no: string | null;
  length: number;
  country: number;
  record_country: string | null;
  sortable_rank: number;
  people: string | null;
  isrc: string | null;
  report_id: number;
  report_track_id: number;
  user_id: number;
  spotify_id: string | null;
}

export interface ReportDetails {
  program_name: string;
  program_no: number | null;
  program_dj: string;
  program_date: string;
  program_start_time: string;
  program_end_time: string;
  id: number;
  program_id: number;
  rerun: number | null;
  status: number;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface CreateNewReportFormTypes {
  program_name: string | undefined;
  program_no: number | null;
  program_dj: string;
  program_date: string;
  program_start_time: string | undefined;
  program_end_time: string | undefined;
  program_id: number;
  rerun: number | null;
  status: number;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface ReportState {
  report: Array<ReportItem>;
  playlog: Array<PlaylogItem>;
  editTrackId: number | null;
  reportDetails: ReportDetails | null;
  newReport: ReportDetails | null;
  loading: boolean;
  checkedForDelete: Array<number>;
  currentTrack: Track | null;
}

// report action types
interface GetReportDetailsAction {
  type: typeof GET_REPORT_DETAILS;
  data: ReportDetails;
}

interface CreateReportAction {
  type: typeof CREATE_REPORT;
  data: ReportDetails;
}

interface UpdateReportAction {
  type: typeof UPDATE_REPORT;
  data: ReportDetails;
}

interface GetOneReportAction {
  type: typeof GET_ONE_REPORT;
  data: ReportItem[];
}

interface PlaylogAction {
  type: typeof GET_PLAYLOG_TRACKS;
  playlog: Array<PlaylogItem>;
  report: Array<ReportItem>;
}

interface AddTrackToReportAction {
  type: typeof ADD_TRACK_TO_REPORT;
  data: ReportItem;
}

interface AddNewTrackToReportAction {
  type: typeof ADD_NEW_TRACK;
  data: ReportItem;
}

interface UpdateTrackAction {
  type: typeof UPDATE_TRACK;
  data: ReportItem;
}

interface SetEditTrackIdAction {
  type: typeof SET_EDIT_TRACK_ID;
  data: number;
}

interface GetOneTrackAction {
  type: typeof GET_ONE_TRACK;
  data: Track;
}

interface RemoveCurrentTrackAction {
  type: typeof REMOVE_CURRENT_TRACK;
}

interface DeleteTrackFromReportAction {
  type: typeof DELETE_TRACK_FROM_REPORT;
  data: number;
}

interface CheckForDeleteAction {
  type: typeof CHECK_FOR_DELETE;
  data: number;
}

interface UncheckForDeleteAction {
  type: typeof UNCHECK_FOR_DELETE;
  data: number;
}

interface ClearCheckedForDeleteAction {
  type: typeof CLEAR_CHECKED_FOR_DELETE;
}

interface ClearCurrentReportAction {
  type: typeof CLEAR_CURRENT_REPORT;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

export type ReportActionTypes =
  | GetOneReportAction
  | UpdateReportAction
  | PlaylogAction
  | GetReportDetailsAction
  | CreateReportAction
  | AddTrackToReportAction
  | AddNewTrackToReportAction
  | UpdateTrackAction
  | SetEditTrackIdAction
  | GetOneTrackAction
  | RemoveCurrentTrackAction
  | DeleteTrackFromReportAction
  | ClearCurrentReportAction
  | CheckForDeleteAction
  | UncheckForDeleteAction
  | ClearCheckedForDeleteAction
  | SetLoadingAction;

export interface AddTrackToReportParams {
  track_id: number;
  report_id: number;
  length: number;
  sortable_rank: number;
}

export interface DeleteTrackFromReportParams {
  report_track_id: number;
  report_id: number;
  remainingTracks: Array<ReportItem>;
}
