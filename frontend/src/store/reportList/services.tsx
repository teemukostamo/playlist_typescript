import axios from 'axios';
import download from 'downloadjs';
import { ReportTransferParams } from './types';

const baseUrl = '/api/reportslist';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

// get a list of reports by date
const getAllByDate = async (date: string) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/date/${date}`, config);
  return request.data;
};

// get all by month and by user
const getAllByDateByUser = async (date: string, user: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(
    `${baseUrl}/all?date=${date}&user=${user}`,
    config
  );
  return request.data;
};

// get all in progress reports of one user
const getAllInProgress = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${baseUrl}/user/${id}`, config);
  return request.data;
};

const getAllTransfers = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get('/api/reporttransfer', config);
  return request.data;
};

const deleteReport = async (id: number) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/${id}`, {}, config);
  return request.data;
};

// generate text file for download
const generateReportDownload = async (params: ReportTransferParams) => {
  try {
    const config = {
      headers: { Authorization: token, responseType: 'blob' },
    };
    const request = await axios.post('/api/reporttransfer', params, config);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

// download report
export const downloadReport = async (filename: string) => {
  try {
    const config = {
      headers: { Authorization: token, responseType: 'blob' },
    };
    const response = await axios.get(`/api/reporttransfer/${filename}`, config);
    download(response.data, filename);
  } catch (error) {
    console.log(error);
  }
};

export default {
  setToken,
  deleteReport,
  getAllByDate,
  getAllByDateByUser,
  getAllInProgress,
  getAllTransfers,
  generateReportDownload,
  downloadReport,
};
