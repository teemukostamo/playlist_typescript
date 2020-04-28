import axios from 'axios';
import {
  AddTrackToReportParams,
  ReportDetails,
  CreateNewReportFormTypes,
  PlaylogParams,
  PlaylogRawData,
  PlaylogNewArray,
  PlaylogNewArrayWithSortable,
  ReportItem,
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

const updateSortableRank = async (remainingTracks: Array<ReportItem>) => {
  const config = {
    headers: { Authorization: token },
  };
  if (remainingTracks === null) {
    return;
  }
  remainingTracks.forEach(async (track, index) => {
    const trackToUpdate = {
      sortable_rank: index + 1,
    };
    const request = await axios.put(
      `${baseUrl}/${track.report_track_id}`,
      trackToUpdate,
      config
    );
    return request.data;
  });
};

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

const checkPlaylogTracks = async (searchParams: PlaylogParams) => {
  const config = {
    headers: { Authorization: token },
  };

  const tracks = await axios.get<PlaylogRawData>(
    `/api/playlog?date=${searchParams.date}`
  );

  let arr: Array<PlaylogRawData> = [];
  const entries = Object.entries(tracks.data);
  // eslint-disable-next-line no-unused-vars
  entries.forEach(([_key, value]) => {
    arr.push(value);
  });
  arr = arr.reverse();

  const newArr: Array<PlaylogNewArray> = [];
  arr.forEach((track) => {
    let hours: number | string = track.date.charAt(11) + track.date.charAt(12);
    hours = parseInt(hours);
    const a = track.length.split(':');
    const seconds = parseInt(a[0]) * 60 + parseInt(a[1]);
    // make loop skip the songs not matching the start time - end time -window
    if (
      hours < parseInt(searchParams.startTime) ||
      hours >= parseInt(searchParams.endTime)
    ) {
      return;
    }
    newArr.push({
      album_name: track.album,
      artist_name: track.artist,
      cat_id: track.matrix,
      disc_no: Number(track.side),
      track_no: Number(track.tracknumber),
      isrc: track.isrc,
      record_country: track.recording_country,
      country: null,
      play_time: track.date,
      djonline_id: track.id,
      label: track.label,
      length: seconds,
      track_title: track.song,
      year: track.year,
      // sortable_rank: searchParams.sortable_rank_start + index + 1,
      report_id: searchParams.report_id,
    });
  });
  const newerArr: Array<PlaylogNewArrayWithSortable> = [];
  newArr.forEach((track, index) => {
    newerArr.push({
      ...track,
      sortable_rank: searchParams.sortable_rank_start + index + 1,
    });
  });
  const returnArr: Array<ReportItem> = [];
  newerArr.forEach(async (track) => {
    const request = await axios.post(`/api/tracks/playlog`, track, config);
    returnArr.push(request.data);
  });
  console.log('return array at reportservice', returnArr);
  return returnArr;
};

export default {
  setToken,
  addTrackToReport,
  deleteTrackFromReport,
  deleteReport,
  updateSortableRank,
  getOne,
  getReportDetails,
  createReport,
  updateReport,
  checkPlaylogTracks,
};
