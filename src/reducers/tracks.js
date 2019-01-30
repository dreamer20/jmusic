import { combineReducers } from 'redux';

import * as types from '../actions/types';

const byID = (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_TRACKS:
      const tracks = {}
      action.tracks.forEach(track => tracks[track.id] = track);
      return tracks;
    default:
      return state;
  }
};

const allIDs = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_TRACKS:
      return [
        ...action.tracks.map(track => track.id)
      ];
    default:
      return state;
  }
};

const inPlaylist = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TRACKS_TO_PLAYLIST:
      return action.tracks;
    default:
      return state;
  }
};

export default combineReducers({
  byID,
  allIDs,
  inPlaylist
});