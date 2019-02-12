import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrentTime, nextTrack } from '../actions/';

class Audio extends Component {
  constructor(props) {
    super(props);

    this.audioRef = React.createRef();

    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }

  handleTimeUpdate() {
    const time = Math.floor(this.audioRef.current.currentTime);
    if (time > this.props.currentTime) {
      this.props.setCurrentTime(time);
    }
  }

  componentDidUpdate(prevProps) {
    const { paused, volume, currentTime } = this.props;
    const audio = this.audioRef.current;

    if (paused) {
      audio.pause();
    } else {
      audio.play();
    }

    if (volume !== audio.volume) {
      audio.volume = volume;
    }

    if (prevProps.timeSliderCaptured === true && this.props.timeSliderCaptured === false) {
      audio.currentTime = currentTime;
    }
  }

  render() {
    const { track, nextTrack } = this.props;
    return (
      <audio
        src={track ? track.audio : ''}
        ref={this.audioRef}
        onEnded={nextTrack}
        onTimeUpdate={this.handleTimeUpdate}
      />
    );
  }
};

const mapStateToProps = state => ({
  track: state.tracks.byID[state.player.track],
  currentTime: state.player.currentTime,
  paused: state.player.paused,
  volume: state.player.volume,
  timeSliderCaptured: state.player.timeSliderCaptured
});

const mapDispatchToProps = dispatch => ({
  setCurrentTime(time) {
    dispatch(setCurrentTime(time));
  },
  nextTrack() {
    dispatch(nextTrack());
  }
});

Audio.propTypes = {
  track: PropTypes.object,
  paused: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  timeSliderCaptured: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Audio);