import axios from 'axios';
import url from '../config';
import {
  GET_DEVICE_LIST,
  GET_DEVICE_BY_NAME,
  GET_DEVICE_CARRY_RECORD,
  GET_DEVICE_CIRCULATE_RECORD,
} from './actionTypes';
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
 * @returns 返回 Redux 可用的 action
 */
const getDeviceByNameAction = (value) => ({
  type: GET_DEVICE_BY_NAME,
  value,
});

/**
 * 通过设备名称搜索匹配的设备
 * @param {String} name
 * @returns 返回中间件可用的 action
 */
export const getDeviceByName = (name) => {
  return (dispatch) => {
    axios.get('/device/search?keyword=' + name).then((res) => {
      console.log(res);
      const action = getDeviceByNameAction(res.data.data.deviceList);
      dispatch(action);
    });
  };
};

/**
 * 创建 redux 需要的 action
 * @param {Array} value
 * @returns 返回 Redux 可用的 action
 */
const getDeviceCarryRecordAction = (value) => ({
  type: GET_DEVICE_CARRY_RECORD,
  value,
});

/**
 * 通过设备 ID，获取设备的带出记录
 * @param {String} id
 * @returns 返回中间件可用的 action
 */
export const getDeviceCarryRecord = (id) => {
  return (dispatch) => {
    axios.get('/warnRecord?deviceId=' + id).then((res) => {
      console.log(res);
    });
  };
};

/**
 * 创建 redux 需要的 action
 * @param {Array} value
 * @returns 返回 Redux 可用的 action
 */
const getDeviceCirculateRecordAction = (value) => ({
  type: GET_DEVICE_CIRCULATE_RECORD,
  value,
});

/**
 * 通过设备 ID，获取设备流通记录
 * @param {String} id
 * @returns 返回 Redux 可用的 action
 */
export const getDeviceCirculateRecord = (id) => {
  return (dispatch) => {
    axios.get('/circulateRecord?deviceId=' + id).then((res) => {
      console.log(res);
    });
  };
};
