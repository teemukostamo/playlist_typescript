import { Dispatch } from 'redux';
import {
  AddTrackToReportParams,
  ReportDetails,
  ReportItem,
  DeleteTrackFromReportParams,
} from './types';
import {
  GET_ONE_REPORT,
  GET_REPORT_DETAILS,
  SET_EDIT_TRACK_ID,
  CREATE_REPORT,
  UPDATE_REPORT,
  CHECK_FOR_DELETE,
  UNCHECK_FOR_DELETE,
  CREATE_NEW_PROGRAM_ON_NEW_REPORT,
  SET_LOADING,
  CLEAR_CHECKED_FOR_DELETE,
  CreateNewReportFormTypes,
} from './types';
import reportService from './services';
import programService from '../program/services';

// get one report with tracks by report id
export const getOneReport = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const report = await reportService.getOne(id);
    // console.log('reportreducer', report);
    dispatch({
      type: GET_ONE_REPORT,
      data: report,
      id,
    });
  } catch (error) {
    console.log('reportActions getOneReport error:', error);
  }
};

export const setEditTrackId = (id: Number) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_EDIT_TRACK_ID,
    data: id,
  });
};

// add track to a report
export const addTrackToReport = (trackToAdd: AddTrackToReportParams) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const track = await reportService.addTrackToReport(trackToAdd);
    const report = await reportService.getOne(track.report_id);
    dispatch({
      type: GET_ONE_REPORT,
      data: report,
    });
  } catch (error) {
    console.log('reportActions addTrackToReport error', error);
  }
};

// delete track from report
export const deleteTrackFromReport = (
  params: DeleteTrackFromReportParams
) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await reportService.deleteTrackFromReport(params.report_track_id);
    // await reportService.updateSortableRank(params.remainingTracks);
    const report = await reportService.getOne(params.report_id);
    dispatch({
      type: GET_ONE_REPORT,
      data: report,
    });
  } catch (error) {
    console.log('reportActions deleteTrackFromReport error: ', error);
  }
};

// get report details by report id
export const getReportDetails = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const reportArray = await reportService.getReportDetails(id);
    const report = reportArray[0];
    dispatch({
      type: GET_REPORT_DETAILS,
      data: report,
      id,
    });
  } catch (error) {
    console.log('reportActions getReportDetails error', error);
  }
};

export const createReport = (newReport: CreateNewReportFormTypes) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    // if (newReport.program_id === '' && newReport.new_program_name !== '') {
    //   const newProgram = {
    //     name: newReport.new_program_name,
    //     user_id: newReport.user_id
    //   };
    //   const program = await programService.createProgram(newProgram);
    //   dispatch({
    //     type: CREATE_NEW_PROGRAM_ON_NEW_REPORT,
    //     data: program
    //   });
    //   const newReportWithNewProgram = {
    //     ...newReport,
    //     program_id: program.id,
    //     display: 1
    //   };
    //   const report = await reportService.createReport(newReportWithNewProgram);
    //   dispatch({
    //     type: CREATE_REPORT,
    //     data: report
    //   });
    // } else {
    //   const report = await reportService.createReport(newReport);
    //   dispatch({
    //     type: CREATE_REPORT,
    //     data: report
    //   });
    // }
    const report = await reportService.createReport(newReport);
    dispatch({
      type: CREATE_REPORT,
      data: report,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const copyReport = (
//   reportDetailsToCopy,
//   reportTracksToCopy
// ) => async dispatch => {
//   dispatch({
//     type: SET_LOADING
//   });
//   const report = await reportService.createReport(reportDetailsToCopy);
//   dispatch({
//     type: CREATE_REPORT,
//     data: report
//   });
//   reportTracksToCopy.forEach(async track => {
//     const trackToAdd = {
//       ...track,
//       report_id: report.id,
//       report_track_id: null
//     };
//     await reportService.addTrackToReport(trackToAdd);
//   });
//   const newReport = await reportService.getOne(report.id);
//   dispatch({
//     type: GET_ONE_REPORT,
//     data: newReport
//   });
// };

export const updateReport = (updatedReport: ReportDetails) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    await reportService.updateReport(updatedReport);
    dispatch({
      type: UPDATE_REPORT,
      data: updatedReport,
    });
  } catch (error) {
    console.log('reportActions updateReport error:', error);
  }
};

export const checkForDelete = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: CHECK_FOR_DELETE,
      data: id,
    });
  } catch (error) {
    console.log('reportActions checkFordelete error', error);
  }
};

export const unCheckForDelete = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: UNCHECK_FOR_DELETE,
      data: id,
    });
  } catch (error) {
    console.log('reportActions unCheckForDelete error', error);
  }
};

export const deleteChecked = (
  idsToDelete: Array<number>,
  // eslint-disable-next-line camelcase
  report_id: Number,
  remainingTracks: Array<ReportItem>
) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    idsToDelete.forEach(async (id: number) => {
      await reportService.deleteTrackFromReport(id);
    });
    // await reportService.updateSortableRank(remainingTracks);
    // const report = await reportService.getOne(report_id);
    // console.log(report);
    dispatch({
      type: GET_ONE_REPORT,
      data: remainingTracks,
    });
    dispatch({
      type: CLEAR_CHECKED_FOR_DELETE,
    });
  } catch (error) {
    console.log('reportActions deleteChecked error:', error);
  }
};

// eslint-disable-next-line camelcase
// export const updateSortableRank = newOrder => async dispatch => {
//   try {
//     dispatch({
//       type: SET_LOADING
//     });
//     await reportService.updateSortableRank(newOrder);
//     const updatedSortableRanks = [];
//     newOrder.forEach((track, index) => {
//       const item = {
//         ...track,
//         sortable_rank: index + 1
//       };
//       updatedSortableRanks.push(item);
//     });
//     dispatch({
//       type: GET_ONE_REPORT,
//       data: updatedSortableRanks
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
