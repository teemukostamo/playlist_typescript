import { Action, Reducer } from 'redux';
import {
  GET_ONE_REPORT,
  GET_PLAYLOG_TRACKS,
  GET_REPORT_DETAILS,
  ADD_NEW_TRACK,
  UPDATE_TRACK,
  SET_EDIT_TRACK_ID,
  GET_ONE_TRACK,
  REMOVE_CURRENT_TRACK,
  DELETE_TRACK_FROM_REPORT,
  CHECK_FOR_DELETE,
  UNCHECK_FOR_DELETE,
  CLEAR_CHECKED_FOR_DELETE,
  CREATE_REPORT,
  UPDATE_REPORT,
  CLEAR_CURRENT_REPORT,
  SET_LOADING,
  ADD_TRACK_TO_REPORT,
  ReportState,
  ReportActionTypes,
} from './types';

const initialState: ReportState = {
  report: [],
  playlog: [],
  editTrackId: null,
  reportDetails: null,
  newReport: null,
  loading: false,
  checkedForDelete: [],
  currentTrack: null,
};

const reportReducer: Reducer<ReportState, Action> = (
  state = initialState,
  action: ReportActionTypes
) => {
  switch (action.type) {
    case GET_ONE_REPORT:
      return {
        ...state,
        report: action.data,
        loading: false,
      };
    case GET_PLAYLOG_TRACKS:
      return {
        ...state,
        report: [...state.report, ...action.report],
        playlog: action.playlog,
        loading: false,
      };
    case GET_REPORT_DETAILS:
      return {
        ...state,
        reportDetails: action.data,
        newReport: null,
        loading: false,
      };
    case ADD_NEW_TRACK:
      return {
        ...state,
        report: [...state.report, action.data],
        loading: false,
      };
    case ADD_TRACK_TO_REPORT:
      return {
        ...state,
        report: [...state.report, action.data],
      };
    case UPDATE_TRACK:
      return {
        ...state,
        report: state.report.map((track) =>
          track.track_id === action.data.track_id ? action.data : track
        ),
        loading: false,
      };
    case SET_EDIT_TRACK_ID:
      return {
        ...state,
        editTrackId: action.data,
      };
    case GET_ONE_TRACK:
      return {
        ...state,
        currentTrack: action.data,
        loading: false,
      };
    case REMOVE_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: null,
      };
    case CLEAR_CURRENT_REPORT:
      return {
        ...state,
        report: [],
      };
    case CREATE_REPORT:
      return {
        ...state,
        newReport: action.data,
        reportDetails: action.data,
        loading: false,
      };
    case UPDATE_REPORT:
      return {
        ...state,
        reportDetails: action.data,
        newReport: null,
        loading: false,
      };
    case DELETE_TRACK_FROM_REPORT:
      return {
        ...state,
        report: state.report.filter(
          (track) => track.report_track_id !== action.data
        ),
      };
    case CHECK_FOR_DELETE:
      return {
        ...state,
        checkedForDelete: [action.data, ...state.checkedForDelete],
      };
    case UNCHECK_FOR_DELETE:
      return {
        ...state,
        checkedForDelete: state.checkedForDelete.filter(
          (id) => id !== action.data
        ),
      };
    case CLEAR_CHECKED_FOR_DELETE:
      return {
        ...state,
        checkedForDelete: [],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reportReducer;
