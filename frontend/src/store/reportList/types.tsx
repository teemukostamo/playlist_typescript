export const GET_ALL_REPORTS_BY_DATE = 'GET_ALL_REPORTS_BY_DATE';
export const GET_ALL_IN_PROGRESS = 'GET_ALL_IN_PROGRESS';
export const GET_ALL_REPORT_TRANSFERS = 'GET_ALL_REPORT_TRANSFERS';
export const GENERATE_REPORT_TRANSFER = 'GENERATE_REPORT_TRANSFER';
export const FILTER_BY_USER_ID = 'FILTER_BY_USER_ID';
export const FILTER_BY_STATUS = 'FILTER_BY_STATUS';
export const FILTER_BY_TEXT = 'FILTER_BY_TEXT';
export const DELETE_REPORT = 'DELETE_REPORT';
export const CLEAR_CURRENT_REPORT = 'CLEAR_CURRENT_REPORT';
export const SET_LOADING = 'SET_LOADING';

export interface Report {
  program_no: number | null;
  name: string;
  program_date: string;
  program_start_time: string;
  program_end_time: string;
  status: number;
  rerun: number | null;
  program_dj: string;
  id: number;
  user_id: number;
}

export interface ReportTransfer {
  id: number;
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  status: number;
  filename: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface ReportListState {
  inProgress: Array<Report>;
  reportList: Array<Report>;
  reportListDate: string | null;
  reportTransferList: Array<ReportTransfer>;
  lastTransfer: ReportTransfer | null;
  filterStatusValue: number | null;
  filterUserValue: number | null;
  filterByText: string;
  error: string | null;
  loading: boolean;
}

export interface ReportTransferParams {
  user_id: number;
  status: number;
  period: string;
  filename: string;
}

export interface DeleteInProgressReportParams {
  report_id: number;
  user_id: number;
}

// reportlist action types
interface GetAllReportsByDateAction {
  type: typeof GET_ALL_REPORTS_BY_DATE;
  data: Array<Report>;
  date: string;
}

interface GetAllInProgressAction {
  type: typeof GET_ALL_IN_PROGRESS;
  data: Array<Report>;
}

interface GetAllReportTransfersAction {
  type: typeof GET_ALL_REPORT_TRANSFERS;
  data: Array<ReportTransfer>;
}

interface GenerateReportTransferAction {
  type: typeof GENERATE_REPORT_TRANSFER;
  data: ReportTransfer;
}

interface FilterByUserIdAction {
  type: typeof FILTER_BY_USER_ID;
  data: number;
}

interface FilterByStatusAction {
  type: typeof FILTER_BY_STATUS;
  data: number;
}

interface FilterByTextAction {
  type: typeof FILTER_BY_TEXT;
  data: string;
}

interface DeleteReportAction {
  type: typeof DELETE_REPORT;
  data: number;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

export type ReportListActionTypes =
  | GetAllReportsByDateAction
  | GetAllInProgressAction
  | GetAllReportTransfersAction
  | GenerateReportTransferAction
  | FilterByUserIdAction
  | FilterByStatusAction
  | FilterByTextAction
  | DeleteReportAction
  | SetLoadingAction;

export interface ReportListSelectionDate {
  reportYear: string;
  reportMonth: string;
}
