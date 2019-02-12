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

const currentTime = (state = 0, action) => {
  if (action.type === types.SET_CURRENT_TIME) {
    return action.time;
  }

  return state;
};

const volume = (state = 1, action) => {
  if (action.type === types.SET_VOLUME) {
    return action.volume;
  }

  return state;
};

const timeSliderCaptured = (state = false, action) => {
  if (action.type === types.CAPTURE_TIME_SLIDER) {
    return true;
  } else if (action.type === types.RELEASE_TIME_SLIDER) {
    return false;
  }

  return state;
};

const fullPlayerOpen = (state = false, action) => {
  if (action.type === types.OPEN_FULL_PLAYER) {
    return true;
  } else if (action.type === types.CLOSE_FULL_PLAYER) {
    return false;
  }

  return state;
};

export default combineReducers({
  track,
  paused,
  currentTime,
  volume,
  timeSliderCaptured,
  fullPlayerOpen
});