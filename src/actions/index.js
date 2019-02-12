import * as types from './types';

const clientID = 'e996f43b';
const apiRoot = 'https://api.jamendo.com/v3.0/';

export const receiveTracks = tracks => ({
  type: types.RECEIVE_TRACKS,
  tracks
});

export const playTrack = () => (dispatch, getState) => {
  const state = getState();
  if (!state.player.track) {
    console.log(state.search.results[0]);
    dispatch(selectTrack(state.search.results[0]));
  }

  dispatch({
    type: types.SET_ON_PLAY
  });
};

export const stopTrack = () => ({
  type: types.SET_ON_PAUSE
});

export const nextTrack = () => (dispatch, getState) => {
  const state = getState();
  const playlist = state.tracks.inPlaylist;
  let nextTrackIndex;

  const currentTrackIndex = playlist.indexOf(state.player.track);

  if (currentTrackIndex < playlist.length - 1) {
    nextTrackIndex = currentTrackIndex + 1;
  } else {
    nextTrackIndex = 0;
  }

  dispatch(selectTrack(playlist[nextTrackIndex]));
};

export const prevTrack = () => (dispatch, getState) => {
  const state = getState();
  const playlist = state.tracks.inPlaylist;
  let prevTrackIndex;

  const currentTrackIndex = playlist.indexOf(state.player.track);

  if (currentTrackIndex > 0) {
    prevTrackIndex = currentTrackIndex - 1;
  } else {
    prevTrackIndex = playlist.length - 1;
  }

  dispatch(selectTrack(playlist[prevTrackIndex]));
};

export const setCurrentTime = time => ({
  type: types.SET_CURRENT_TIME,
  time
});

export const setVolume = volume => ({
  type: types.SET_VOLUME,
  volume
});

export const captureTimeSlider = volume => ({
  type: types.CAPTURE_TIME_SLIDER,
});

export const releaseTimeSlider = volume => ({
  type: types.RELEASE_TIME_SLIDER,
});


export const openFullPlayer = () => ({
  type: types.OPEN_FULL_PLAYER
});

export const closeFullPlayer = () => ({
  type: types.CLOSE_FULL_PLAYER
});

export const selectTrack = id => (dispatch, getState) => {
  const state = getState();

  if (state.search.results.indexOf(id) !== -1) {
    dispatch({ 
      type: types.ADD_TRACKS_TO_PLAYLIST,
      tracks: state.search.results
    });
    dispatch(setCurrentTime(0));
    dispatch({
      type: types.SELECT_TRACK,
      id
    });
  }
} 

export const removeTracks = () => ({
  type: types.REMOVE_TRACKS
});

export const findTracksByName = (value) => (dispatch, getState) => {
  const state = getState();
  const queryParams = `client_id=${clientID}&limit=10&namesearch=${value}`;
  const url = `${apiRoot}tracks/?${queryParams}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const inPlaylist = state.tracks.inPlaylist.map(id => state.tracks.byID[id]);
      const tracks = inPlaylist.concat(data.results);
      dispatch({
        type: types.UPDATE_RESULTS,
        tracks: data.results
      });
      dispatch(receiveTracks(tracks));
  });
}

// export findMoreTracks = () => (dispatch, getState) => {
//   const { search } = getState();
//   fetch(search.next)
//     .then(response => response.json())
//     .then(data => {
//       dispatch(removeTracks());
//       dispatch(receiveTracks(data.results));
//   });
// }

export const fetchTracks = (params = {}) => dispatch => {
  let queryParams = '';

  if (typeof params === 'object') {
    params.client_id = clientID;
    params.limit = params.limit || 10;
    params.order = params.order || 'popularity_total';    
    for (let param in params) {
      queryParams += `${param}=${params[param]}&`;
    }
  } else {
    queryParams = params;
  }


  const url = `${apiRoot}tracks/?${queryParams}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: types.UPDATE_RESULTS,
        tracks: data.results
      });
      dispatch(receiveTracks(data.results));
  });
};
