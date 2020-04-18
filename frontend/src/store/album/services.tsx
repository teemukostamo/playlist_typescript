import { UpdateAlbumParams, ChangeArtistParams } from './types';
import axios from 'axios';

const baseUrl = '/api/albums';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getOneAlbum = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/albumdetails/${id}`, config);
  return response.data;
};

const getTracklistOfAlbum = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/tracklist/${id}`, config);
  return response.data;
};

const updateAlbum = async (albumToUpdate: UpdateAlbumParams) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/albumdetails/${albumToUpdate.id}`,
    albumToUpdate,
    config
  );
  return response.data;
};

const changeArtistId = async (artistToUpdate: ChangeArtistParams) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    '/api/albums/updateartist',
    artistToUpdate,
    config
  );
  return response.data;
};

export default {
  setToken,
  updateAlbum,
  getOneAlbum,
  getTracklistOfAlbum,
  changeArtistId,
};
