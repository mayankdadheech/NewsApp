import axios from 'axios';

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {data} = error.response || {};
    return Promise.reject(data);
  },
);

// Common API caller function
async function apiCaller({url, params, data = null, method = 'GET'}) {
  const response = await axiosInstance({
    method,
    url,
    data,
    params,
  });
  return response.data;
}

export default apiCaller;
