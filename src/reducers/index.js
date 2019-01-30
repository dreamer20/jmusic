import { combineReducers } from 'redux';

import tracks from './tracks';
import search from './search';
import player from './player';

/*
  const initState = {
    tracks: {
      byID: {},
      allIDs: [],
      inPlaylist: []
    },
    search: {
      value: '',
      results: [],
      next: ''
    },
    player: {
      track: '',
      paused: true
    }
  };
*/

export const getSelectedTrackSource = (tracks, selected) => {
  if (selected && tracks.byID[selected]) {
    return tracks.byID[selected].audio
  } else {
    return '';
  }
};

export const getSelectedTrackTitle = (tracks, selected) => {
  if (selected && tracks.byID[selected]) {
    return tracks.byID[selected].name
  } else {
    return '';
  }
};

export default combineReducers({
  tracks,
  player,
  search
});