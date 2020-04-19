import { Action, Reducer } from 'redux';
import {
  GET_ALL_REPORTS_BY_DATE,
  GET_ALL_IN_PROGRESS,
  GET_ALL_REPORT_TRANSFERS,
  GENERATE_REPORT_TRANSFER,
  FILTER_BY_USER_ID,
  FILTER_BY_STATUS,
  FILTER_BY_TEXT,
  DELETE_REPORT,
  SET_LOADING,
  ReportListState,
  ReportListActionTypes,
} from './types';

const initialState: ReportListState = {
  reportList: [],
  inProgress: [],
  reportListDate: null,
  reportTransferList: [],
  lastTransfer: null,
  loading: false,
  filterStatusValue: null,
  filterUserValue: null,
  filterByText: '',
  error: null,
};

const reportListReducer: Reducer<ReportListState, Action> = (
  state = initialState,
  action: ReportListActionTypes
) => {
  switch (action.type) {
    case GET_ALL_REPORTS_BY_DATE:
      return {
        ...state,
        reportList: action.data,
        reportListDate: action.date,
        loading: false,
      };
    case GET_ALL_IN_PROGRESS:
      return {
        ...state,
        inProgress: action.data,
        loading: false,
      };
    case GET_ALL_REPORT_TRANSFERS:
      return {
        ...state,
        reportTransferList: action.data,
        loading: false,
      };
    case GENERATE_REPORT_TRANSFER:
      return {
        ...state,
        lastTransfer: action.data,
        loading: false,
      };
    case DELETE_REPORT:
      return {
        ...state,
        reportList: state.reportList.filter(
          (report) => report.id !== action.data
        ),
        loading: false,
      };
    case FILTER_BY_USER_ID:
      return {
        ...state,
        filterUserValue: action.data,
      };
    case FILTER_BY_STATUS:
      return {
        ...state,
        filterStatusValue: action.data,
      };
    case FILTER_BY_TEXT:
      return {
        ...state,
        filterByText: action.data,
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

export default reportListReducer;
