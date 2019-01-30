import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSelectedTrackSource, getSelectedTrackTitle } from '../reducers/';

import { playTrack,
        stopTrack,
        nextTrack,
        prevTrack } from '../actions/';

import TimeProgressSlider from './TimeProgressSlider';

import '../styles/Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeProgress: 0,
      currentTime: '00:00',
      duration: '00:00',
    }

    this.audioRef = React.createRef();

    this.handleBtnPlayClick = this.handleBtnPlayClick.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleMetaData = this.handleMetaData.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleCapturedSlider = this.handleCapturedSlider.bind(this);
    this.handleTimeProgressUpdate = this.handleTimeProgressUpdate.bind(this);
    this.handleTimeProgressChange = this.handleTimeProgressChange.bind(this);
  }

  handleBtnPlayClick() {
    if (this.props.paused) {
      this.props.play();
    } else {
      this.props.pause();
    }
  }

  handleEnded() {
    this.props.next();
  }

  componentDidUpdate() {
    if (this.props.paused) {
      this.audioRef.current.pause();
    } else {
      this.audioRef.current.play();
    }
  }

  handleTimeUpdate() {
    const audio = this.audioRef.current;
    let currentTime = Math.round(audio.currentTime);
    let minutes = parseInt(currentTime / 60);
    let seconds = currentTime % 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    currentTime = `${minutes}:${seconds}`;

    this.setState({ currentTime });
  }

  handleMetaData() {
    const audio = this.audioRef.current;
    let duration = Math.round(audio.duration);
    let minutes = parseInt(duration / 60);
    let seconds = duration % 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    duration = `${minutes}:${seconds}`;

    this.setState({ duration });
  }

  handleTimeChange(time) {
    const audio = this.audioRef.current;
    audio.currentTime = (audio.duration / 100) * time;
    audio.addEventListener('timeupdate', this.handleTimeProgressUpdate);
  }

  handleCapturedSlider() {
    const audio = this.audioRef.current;
    audio.removeEventListener('timeupdate', this.handleTimeProgressUpdate);
  }

  handleTimeProgressUpdate(e) {
    this.handleTimeProgressChange();
  }

  handleTimeProgressChange(timeProgress) {
    const audio = this.audioRef.current;
    if (timeProgress == undefined) {
      const part = audio.duration / 100;
      const currentProgress = audio.currentTime / part ;    
      this.setState({ timeProgress: currentProgress });
    } else {
      this.setState({ timeProgress });
    }
  }

  componentDidMount() {
    const audio = this.audioRef.current;

    audio.addEventListener('timeupdate', this.handleTimeProgressUpdate);
  }



  render() {
    const { paused, next, prev, name } = this.props;
    const { duration, currentTime } = this.state;
    return (
      <div className='player'>
        <audio
          onEnded={this.handleEnded}
          ref={this.audioRef}
          src={this.props.src}
          onLoadedMetadata={this.handleMetaData}
          onTimeUpdate={this.handleTimeUpdate} />
        <div className='control-btn-wrapper'>
          <button className='control-btn' onClick={prev}>
            <div className='player-prev-icon'>
            </div>
          </button>  
          <button className='control-btn' onClick={this.handleBtnPlayClick}>
            <div className={`player-${paused ? 'play' : 'pause'}-icon`}>   
            </div>   
          </button>  
          <button className='control-btn' onClick={next}>
            <div className='player-next-icon'>
            </div>
          </button>     
        </div>
        <div className='track-info-wrapper'>
          <div style={{ textOverflow: 'ellipsis'}} title={name} className='track-info-name'>
            {name}
          </div>
          <div className='track-info-duration'>
            {currentTime} / {duration}
          </div>
        </div>
            <TimeProgressSlider
              onCaptured={this.handleCapturedSlider}
              onTimeProgressChange={this.handleTimeProgressChange}
              timeProgress={this.state.timeProgress}
              onTimeChange={this.handleTimeChange} />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  src: getSelectedTrackSource(state.tracks, state.player.track),
  name: getSelectedTrackTitle(state.tracks, state.player.track),
  paused: state.player.paused
});

const mapStateToDispatch = dispatch => ({
  play() {
    dispatch(playTrack());
  },
  pause() {
    dispatch(stopTrack());
  },
  next() {
    dispatch(nextTrack());
  },
  prev() {
    dispatch(prevTrack());
  }
});

Player.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  paused: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapStateToDispatch)(Player);