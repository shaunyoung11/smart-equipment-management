import { GET_DEVICE_LIST } from './actionTypes';

const defaultState = {
  deviceListAll: [],
};

const reducer = (state = defaultState, action) => {
  if (action.type === GET_DEVICE_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.deviceListAll = action.value;
    return newState;
  }
  return state;
};

export default reducer;
