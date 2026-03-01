import axios from 'axios';
import qs from 'qs';
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const STRAPI_TOKEN = import.meta.env.VITE_API_TOKEN;

export const setRequest = axios.create({
  baseURL: STRAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

setRequest.interceptors.request.use(
  (config) => {
    if (config.method?.toLowerCase() !== 'get' && STRAPI_TOKEN) {
      config.headers.set('Authorization', `Bearer ${STRAPI_TOKEN}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Добавляем сериализатор параметров
setRequest.defaults.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'indices' });
