import axios from 'axios';
import url from '../config';
import { GET_DEVICE_LIST } from './actionTypes';
import { notification } from 'antd';

// 设置后端根路径
axios.defaults.baseURL = url;

// 拦截请求，给请求头中加入 token
axios.interceptors.request.use((config) => {
  console.log(config);
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

const getDeviceListAction = (value) => ({
  type: GET_DEVICE_LIST,
  value,
});

export const getDeviceList = () => {
  return (dispatch) => {
    axios.get('/device/all').then((res) => {
      console.log(res);
      if (res.data.success) {
        const action = getDeviceListAction(res.data.data.deviceList);
        dispatch(action);
      } else {
        notification.error({
          message: '获取设备列表失败！',
        });
      }
    });
  };
};
