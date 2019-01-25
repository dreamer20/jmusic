import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectTrack, stopTrack, playTrack } from '../actions/';

const trackStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid black'
};

class Track extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { track, selected, selectTrack, playTrack, stopTrack, paused } = this.props;

    if (track.id !== selected) {
      selectTrack();
      playTrack();
    } else if (paused) {
      playTrack();
    } else {
      stopTrack();
    }
  }

  render() {
    const { track, selected, paused } = this.props;

    return (
      <div style={trackStyle}>  
        <div>{track.name}</div>
        <div>
          <button onClick={this.handleClick}>
            {paused ? 'play' : 'stop'}
          </button>          
        </div>
      </div>  
    )
  }
};


const mapStateToProps = (state, { id }) => ({
  track: state.tracks.byID[id],
  selected: state.player.selected,
  paused:  isPaused(state.player.paused, state.player.selected, id)
});

const isPaused = (paused ,selected, id) => {
  if (selected === id) {
    return paused;
  }
  return true;
};

const mapStateToDispatch = (dispatch, { id }) => ({
  selectTrack() {
    dispatch(selectTrack(id));
  },

  playTrack() {
    return dispatch(playTrack());
  },

  stopTrack() {
    dispatch(stopTrack());
  }
});

Track.propTypes = {
  track: PropTypes.object.isRequired,
  selected: PropTypes.string,
  paused: PropTypes.bool.isRequired,
  selectTrack: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapStateToDispatch)(Track);