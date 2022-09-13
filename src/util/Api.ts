import axios from 'axios';
import qs from 'qs';

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  params: (params) => params,

  paramsSerializer: (params) => qs.stringify(params)
});
