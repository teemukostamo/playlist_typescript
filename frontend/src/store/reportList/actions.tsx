import { Dispatch } from 'redux';
import {
  GET_ALL_REPORT_TRANSFERS,
  GENERATE_REPORT_TRANSFER,
  SET_LOADING,
  GET_ALL_REPORTS_BY_DATE,
  GET_ALL_IN_PROGRESS,
  CLEAR_CURRENT_REPORT,
  DELETE_REPORT,
  FILTER_BY_USER_ID,
  FILTER_BY_STATUS,
  FILTER_BY_TEXT,
  ReportTransferParams,
  DeleteInProgressReportParams,
} from './types';

import reportListService from './services';

// get a list of report transfers by date
export const getAllTransfers = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const reports = await reportListService.getAllTransfers();
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ALL_REPORT_TRANSFERS,
      data: reports,
    });
  } catch (error) {
    console.log('reportListActions getAllTransfers error', error);
  }
};

export const generateReportTransfer = (params: ReportTransferParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const transferredReport = await reportListService.generateReportDownload(
      params
    );
    const reports = await reportListService.getAllTransfers();
    dispatch({
      type: GET_ALL_REPORT_TRANSFERS,
      data: reports,
    });
    dispatch({
      type: GENERATE_REPORT_TRANSFER,
      data: transferredReport,
    });
  } catch (error) {
    console.log('reportListActions generateReportTransferError', error);
  }
};

// get a list of reports by date
export const getAllReportsByDate = (date: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    dispatch({
      type: CLEAR_CURRENT_REPORT,
    });
    const reports = await reportListService.getAllByDate(date);
    dispatch({
      type: GET_ALL_REPORTS_BY_DATE,
      data: reports,
      date,
    });
  } catch (error) {
    console.log('reportListActions getAllReportsByDate error', error);
  }
};

// get a list of reports by date by user
export const getAllReportsByDateByUser = (date: string, user: number) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    dispatch({
      type: CLEAR_CURRENT_REPORT,
    });
    const reports = await reportListService.getAllByDateByUser(date, user);
    dispatch({
      type: GET_ALL_REPORTS_BY_DATE,
      data: reports,
      date,
    });
  } catch (error) {
    console.log('reportListActions getAllReportsByDateByUser error', error);
  }
};

// get all in progress by current user for front page
export const getAllInProgress = (id: number | undefined) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    dispatch({
      type: CLEAR_CURRENT_REPORT,
    });
    const reports = await reportListService.getAllInProgress(id);
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ALL_IN_PROGRESS,
      data: reports,
    });
  } catch (error) {
    console.log('reportListActions getAllInProgressReports error', error);
  }
};

export const deleteInProgressReport = (
  params: DeleteInProgressReportParams
) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await reportListService.deleteReport(params.report_id);
    const reports = await reportListService.getAllInProgress(params.user_id);
    dispatch({
      type: GET_ALL_IN_PROGRESS,
      data: reports,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReport = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await reportListService.deleteReport(id);
    dispatch({
      type: DELETE_REPORT,
      data: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterByUserId = (id: number) => (dispatch: Dispatch) => {
  dispatch({
    type: FILTER_BY_USER_ID,
    data: id,
  });
};

export const filterByStatus = (status: number) => (dispatch: Dispatch) => {
  dispatch({
    type: FILTER_BY_STATUS,
    data: status,
  });
};

export const filterByText = (text: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: FILTER_BY_TEXT,
    data: text,
  });
};
