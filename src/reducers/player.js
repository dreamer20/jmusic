import { combineReducers } from 'redux';

import * as types from '../actions/types';

const track = (state = '', action) => {
  if (action.type === types.SELECT_TRACK) {
    return action.id;
  }
  return state;
};

const paused = (state = true, action) => {
  if (action.type === types.SET_ON_PAUSE) {
    return true;
  } else if (action.type === types.SET_ON_PLAY) {
    return false;
  }
  return state;
};

export default combineReducers({
  track,
  paused
});