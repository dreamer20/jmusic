import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/FullPlayer.css';

import FullPlayerCloseBtn from './FullPlayerCloseBtn';
import VolumeControlFull from './VolumeControlFull';
import TrackImage from './TrackImage';
import PlayBtn from './PlayBtn';
import NextBtn from './NextBtn';
import PrevBtn from './PrevBtn';
import TrackTitle from './TrackTitle';
import TimeProgressSlider from './TimeProgressSlider';
import TrackDuration from './TrackDuration';
import TrackCurrentTime from './TrackCurrentTime';
import Playlist from './Playlist';

class FullPlayer extends Component {
  render() {
    const { isOpen } = this.props;

    return (
      <div 
        className='full-player-wrapper'
        style={{display: isOpen ? 'block' : 'none'}}>
        <div className='filter'>
        </div>
        <div className='full-player'>
          <div className='full-player-close-btn-wrapper'>
            <FullPlayerCloseBtn className='full-player-close-btn' />
          </div>
          <div className='full-player-playlist-wrapper'>
            <Playlist />
          </div>
          <div className='full-player-track-info-wrapper'>
            <div className='full-player-track-info'>
              <div className='full-player-track-img'>
                <TrackImage />
              </div>
              <div className='full-player-track-data'>
                <div className='full-player-track-data-title'>
                  <TrackTitle />
                </div>
                <div className='full-player-track-data-row'>
                  <div className='full-player-track-current-time'>
                    <TrackCurrentTime />
                  </div>
                  <div className='full-player-track-time-progress-slider'>
                    <TimeProgressSlider large />
                  </div>
                  <div className='full-player-track-duration'>
                    <TrackDuration />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='full-player-controls-wrapper'>
            <div className='full-player-controls'>
              <div className='full-player-volume-wrapper'>
                <VolumeControlFull />
              </div>
              <div className='full-player-btn-wrapper'>
                <PrevBtn 
                  className='full-player-btn'
                  size='2x' />
                <PlayBtn 
                  className='full-player-btn'
                  size='2x' />
                <NextBtn 
                  className='full-player-btn'
                  size='2x' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  isOpen: state.player.fullPlayerOpen
});

FullPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(FullPlayer);