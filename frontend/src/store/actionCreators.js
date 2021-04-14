import axios from 'axios';
import url from '../config';
import { GET_DEVICE_LIST, GET_DEVICE_BY_NAME } from './actionTypes';
import { notification } from 'antd';

// 设置后端根路径
axios.defaults.baseURL = url;

// 拦截请求，给请求头中加入 token
axios.interceptors.request.use((config) => {
  console.log(config);
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

/**
 * 创建 redux 需要的 action
 * @param {Array} value
 * @returns 返回 redux 需要的 Object
 */
const getDeviceListAction = (value) => ({
  type: GET_DEVICE_LIST,
  value,
});

/**
 * 获取设备列表
 * @returns 返回中间件可用的 action
 */
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

/**
 * 创建 redux 需要的 action
 * @param {Array} value
 * @returns 返回中间件可用的 action
 */
const getDeviceByNameAction = (value) => ({
  type: GET_DEVICE_BY_NAME,
  value,
});

export const getDeviceByName = (name) => {
  return (dispatch) => {
    axios.get('/device/search?keyword=' + name).then((res) => {
      console.log(res);
      const action = getDeviceByNameAction(res.data.data.deviceList);
      dispatch(action);
    });
  };
};
