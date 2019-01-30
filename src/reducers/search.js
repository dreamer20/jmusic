import { combineReducers } from 'redux';

import * as types from '../actions/types';

const results = (state = [], action) => {
  switch (action.type) {
    case types.UPDATE_RESULTS:
      return [
        ...action.tracks.map(track => track.id)
      ];
    default:
      return state;
  }
};

export default combineReducers({
  results
});