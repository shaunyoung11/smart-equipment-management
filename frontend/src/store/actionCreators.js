import axios from 'axios';
import url from '../config';

// 设置后端根路径
axios.defaults.baseURL = url;

// 拦截请求，给请求头中加入 token
axios.interceptors.request.use((config) => {
  console.log(config);
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});
