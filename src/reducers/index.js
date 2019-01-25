import { combineReducers } from 'redux';

import * as types from '../actions/types';

const initState = {
  tracks: {
    byID: {

    },
    allIDs: []
  },
  player: {
    src: ''
  }
};

const byID = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_TRACKS:
      const tracks = {
        ...state
      }

      action.tracks.forEach(track => tracks[track.id] = track);
      return tracks;
    case types.REMOVE_TRACKS:
      return {};
    default:
      return state;
  }
};

const allIDs = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_TRACKS:
      return [
        ...state,
        ...action.tracks.map(track => track.id)
      ];
    case types.REMOVE_TRACKS:
      return [];
    default:
      return state;
  }
};

const tracks = combineReducers({
  byID,
  allIDs
});

const selected = (state = '', action) => {
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

const player = combineReducers({
  selected,
  paused
});

export const getSelectedTrackSource = (tracks, selected) => {
  if (selected && tracks.byID[selected]) {
    return tracks.byID[selected].audio
  } else {
    return '';
  }
};

export default combineReducers({
  tracks,
  player
});