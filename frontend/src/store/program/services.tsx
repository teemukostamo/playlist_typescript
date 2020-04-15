import axios from 'axios';
import { MergeProgramParams, NewProgramType, UpdateProgramType } from './types';

const baseUrl = '/api/programs';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAllActive = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.get(`${baseUrl}/active`, config);
  return req.data;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.get(`${baseUrl}/all`, config);
  return req.data;
};

const getOne = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/getone/${id}`, config);
  return request.data;
};

const createProgram = async (newProgram: NewProgramType) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newProgram, config);
  return request.data;
};

const updateProgram = async (updatedProgram: UpdateProgramType) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/update`, updatedProgram, config);
  return request.data;
};

const mergePrograms = async (mergeParams: MergeProgramParams) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/merge`, mergeParams, config);
  return request.data;
};

export default {
  getAllActive,
  getAll,
  getOne,
  createProgram,
  updateProgram,
  mergePrograms,
  setToken,
};
