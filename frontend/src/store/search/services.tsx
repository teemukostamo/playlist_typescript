import axios from 'axios';
import {
  DiscogsQueryType,
  Top100QueryType,
  AdvancedSearchQueryType,
  MergeParamsType,
} from './types';

const baseUrl = '/api/search';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getTracksForAutocompleteSearch = async (query: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/autocomplete/${query}`, config);
  return request.data;
};

const getDiscogsData = async (query: DiscogsQueryType) => {
  const request = await axios.get(
    `https://api.discogs.com/database/search?artist=${query.artist}&release_title=${query.album}&token=${process.env.REACT_APP_DISCOGS_TOKEN}`
  );
  return request.data;
};

const getTop100 = async (query: Top100QueryType) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(
    `/api/top100?list=${query.list}&start_date=${query.start_date}&end_date=${query.end_date}`,
    config
  );
  return request.data;
};

const advancedSearch = async (searchParams: AdvancedSearchQueryType) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(
    `${baseUrl}/advanced?kind=${searchParams.kind}&query=${searchParams.query}`,
    config
  );
  return request.data;
};

const merge = async (mergeParams: MergeParamsType) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/advanced`, mergeParams, config);
  return request.data;
};

const changeArtistOptions = async (query: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/changeartist/${query}`, config);
  return request.data;
};

const changeAlbumOptions = async (query: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/changealbum/${query}`, config);
  return request.data;
};

export default {
  advancedSearch,
  getTop100,
  getDiscogsData,
  getTracksForAutocompleteSearch,
  setToken,
  changeArtistOptions,
  changeAlbumOptions,
  merge,
};
