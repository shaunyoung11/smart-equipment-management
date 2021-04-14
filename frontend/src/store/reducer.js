import { GET_DEVICE_BY_NAME, GET_DEVICE_LIST } from './actionTypes';

const defaultState = {
  deviceListAll: [],
  findValue: '',
};

const reducer = (state = defaultState, action) => {
  if (action.type === GET_DEVICE_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.deviceListAll = action.value;
    return newState;
  }
  if (action.type === GET_DEVICE_BY_NAME) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.deviceListFind = action.value;
    return newState;
  }
  return state;
};

export default reducer;
