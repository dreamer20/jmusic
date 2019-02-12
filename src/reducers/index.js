import { combineReducers } from 'redux';

import tracks from './tracks';
import search from './search';
import player from './player';

// import * as types from '../actions/types';

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

export const getTrackDuration = state => {
  if (state.player.track) {
    return state.tracks.byID[state.player.track].duration
  }

  return 0;
};

export const getTrackTitle = state => {
  if (state.player.track) {
    const track =  state.tracks.byID[state.player.track];
    return `${track.artist_name} - ${track.name}`;
  }

  return '';
};

export const getTrackImage = state => {
  if (state.player.track) {
    return state.tracks.byID[state.player.track].album_image;
  }

  return '';
};


export default combineReducers({
  tracks,
  player,
  search,
});