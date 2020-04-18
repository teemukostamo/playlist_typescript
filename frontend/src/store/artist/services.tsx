import axios from 'axios';
import { UpdateArtistParams } from './types';

const baseUrl = '/api/artists';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

// get artist details
const getOneArtist = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/details/${id}`, config);
  return response.data;
};

const getAlbumsByArtist = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/albumsby/${id}`, config);
  return response.data;
};

const updateArtist = async (artistToUpdate: UpdateArtistParams) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/details/${artistToUpdate.id}`,
    artistToUpdate,
    config
  );
  return response.data;
};

export default {
  setToken,
  updateArtist,
  getOneArtist,
  getAlbumsByArtist,
};
