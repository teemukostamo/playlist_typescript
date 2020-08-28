import axios from 'axios';
import { UserToAdd, UserToUpdate } from './types';

const baseUrl = '/api/users';
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const req = await axios.get(baseUrl, config);
  return req.data;
};

const createUser = async (userToAdd: UserToAdd) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, userToAdd, config);
  return request.data;
};

const updateUser = async (userToUpdate: UserToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${userToUpdate.id}`,
    userToUpdate,
    config
  );
  return response.data;
};

const deleteUser = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  setToken,
  createUser,
  updateUser,
  deleteUser,
};
