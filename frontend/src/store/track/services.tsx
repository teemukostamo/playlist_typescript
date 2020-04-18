import axios from 'axios';
import {
  AddTrackToDbType,
  AddTrackToDbAndReportType,
  ChangeAlbumParams,
  ChangeArtistParams,
} from './types';
const baseUrl = '/api/tracks';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

// add new track and save it to a report
const addNewTrack = async (trackToAdd: AddTrackToDbAndReportType) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/addandreport`,
    trackToAdd,
    config
  );
  return response.data;
};

// add new track without saving to report
const addTrackToDb = async (trackToAdd: AddTrackToDbType) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/addtodb`, trackToAdd, config);
  return response.data;
};

// add track to album without saving to a report
const addTrackToAlbum = async (trackToAdd: AddTrackToDbType) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/addtracktoalbum`,
    trackToAdd,
    config
  );
  return response.data;
};

const updateTrack = async (trackToUpdate: AddTrackToDbType) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(baseUrl, trackToUpdate, config);
  return response.data;
};

const updateAlbumId = async (albumToUpdate: ChangeAlbumParams) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    '/api/tracks/updatealbum',
    albumToUpdate,
    config
  );
  return response.data;
};

const updateArtistId = async (artistToUpdate: ChangeArtistParams) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    '/api/tracks/updateartist',
    artistToUpdate,
    config
  );
  return response.data;
};

const getOneTrack = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/details/${id}`, config);
  return response.data;
};

const getOneTrackHistory = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/history/${id}`, config);
  return response.data;
};

export default {
  setToken,
  addNewTrack,
  addTrackToAlbum,
  updateTrack,
  getOneTrack,
  getOneTrackHistory,
  updateAlbumId,
  updateArtistId,
  addTrackToDb,
};
