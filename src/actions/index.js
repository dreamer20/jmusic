import * as types from './types';

const clientID = 'e996f43b';
const apiRoot = 'https://api.jamendo.com/v3.0/';

export const receiveTracks = tracks => ({
  type: types.RECEIVE_TRACKS,
  tracks
});

export const playTrack = () => dispatch => {
  dispatch({
  type: types.SET_ON_PLAY
});
  return Promise.resolve();
};

export const stopTrack = () => ({
  type: types.SET_ON_PAUSE
});

export const selectTrack = id => ({
  type: types.SELECT_TRACK,
  id
});

export const removeTracks = () => ({
  type: types.REMOVE_TRACKS
});

export const fetchTracksByName = (value) => dispatch => {
  const queryParams = `client_id=${clientID}&limit=10&namesearch=${value}`;
  const url = `${apiRoot}tracks/?${queryParams}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(removeTracks());
      dispatch(receiveTracks(data.results));
  });
}

export const fetchTracks = () => dispatch => {
  const queryParams = `client_id=${clientID}&limit=10&order=popularity_total`;
  const url = `${apiRoot}tracks/?${queryParams}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch(receiveTracks(data.results));
  });
};
