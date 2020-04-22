import axios from 'axios';
import {
  AddTrackToReportParams,
  ReportDetails,
  CreateNewReportFormTypes,
} from './types';

const baseUrl = '/api/reports';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

// get one report with tracks
const getOne = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/${id}`, config);
  return request.data;
};

const addTrackToReport = async (trackToAdd: AddTrackToReportParams) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(`${baseUrl}`, trackToAdd, config);
  return request.data;
};

const deleteTrackFromReport = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const deleteReport = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`/api/reportslist/${id}`, {}, config);
  return request.data;
};

// const updateSortableRank = async remainingTracks => {
//   const config = {
//     headers: { Authorization: token }
//   };
//   if (remainingTracks === null) {
//     return;
//   }
//   remainingTracks.forEach(async (track, index) => {
//     const trackToUpdate = {
//       sortable_rank: index + 1
//     };
//     const request = await axios.put(
//       `${baseUrl}/${track.report_track_id}`,
//       trackToUpdate,
//       config
//     );
//     return request.data;
//   });
// };

const getReportDetails = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`/api/reportdetails/details/${id}`, config);
  return request.data;
};

// create new report
const createReport = async (newReport: CreateNewReportFormTypes) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post('/api/reportdetails', newReport, config);
  return response.data;
};

// update existing report details
const updateReport = async (updatedReport: ReportDetails) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.put(
    `/api/reportdetails/update/${updatedReport.id}`,
    updatedReport,
    config
  );
  return updatedReport;
};

export default {
  setToken,
  addTrackToReport,
  deleteTrackFromReport,
  deleteReport,
  // updateSortableRank,
  getOne,
  getReportDetails,
  createReport,
  updateReport,
};
