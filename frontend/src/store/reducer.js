import {
  GET_DEVICE_BY_NAME,
  GET_DEVICE_CARRY_RECORD,
  GET_DEVICE_CIRCULATE_RECORD,
  GET_DEVICE_LIST,
  GET_INFO,
  GET_STAFF_LIST,
} from './actionTypes';

const defaultState = {
  deviceListAll: [],
  findValue: '',
};

const reducer = (state = defaultState, action) => {
  // 获取所有设备列表
  if (action.type === GET_DEVICE_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.deviceListAll = JSON.parse(JSON.stringify(action.value));
    return newState;
  }
  // 通过设备名查找设备
  if (action.type === GET_DEVICE_BY_NAME) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.deviceListFind = action.value;
    return newState;
  }
  // 获取设备带出记录
  if (action.type === GET_DEVICE_CARRY_RECORD) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.deviceCarryRecord = action.value;
    return newState;
  }
  // 获取设备流通记录
  if (action.type === GET_DEVICE_CIRCULATE_RECORD) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.deviceCirculateRecord = action.value;
    return newState;
  }
  // 获取员工列表
  if (action.type === GET_STAFF_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.staffList = action.value;
    console.log(action.value);
    return newState;
  }
  // 获取盘点信息
  if (action.type === GET_INFO) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.info = [
      {
        deviceOnLoan: action.value.deviceOnLoan,
        allCount: action.value.allCount,
        inventory: action.value.inventory,
      },
    ];
    newState.deviceListInStore = action.value.onLoanList;
    return newState;
  }
  return state;
};

export default reducer;
