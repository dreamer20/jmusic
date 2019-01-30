import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectTrack, stopTrack, playTrack } from '../actions/';

import '../styles/Track.css';

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
    const { track, paused, id, selected } = this.props;

    if (!track) return null;
    
    return (
      <div className={`track ${selected === id ? 'active' : ''}`}>  
        <div className='track-title' title={track.name}>{track.name}</div>
        <div className='track-play-btn-wrapper'>       
          <button
            className='track-play-btn'
            onClick={this.handleClick}>
            <div className={`track-${paused ? 'play' : 'pause'}-icon`}>
            </div>
          </button>                 
        </div>
      </div>  
    )
  }
};


const mapStateToProps = (state, { id }) => ({
  track: state.tracks.byID[id],
  selected: state.player.track,
  paused:  isPaused(state.player.paused, state.player.track, id)
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
  track: PropTypes.object,
  selected: PropTypes.string,
  paused: PropTypes.bool.isRequired,
  selectTrack: PropTypes.func.isRequired,
  playTrack: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapStateToDispatch)(Track);