import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TimeProgressSlider from './TimeProgressSlider';
import VolumeControl from './VolumeControl';
import TrackDuration from './TrackDuration';
import TrackCurrentTime from './TrackCurrentTime';
import TrackTitle from './TrackTitle';
import PlayBtn from './PlayBtn';
import NextBtn from './NextBtn';
import PrevBtn from './PrevBtn';
import FullPlayerOpenBtn from './FullPlayerOpenBtn';

import '../styles/Player.css';

class Player extends Component {
  render() {
    const { track } = this.props;
    return (
      <div
        className={`player-wrapper ${track ? '' : 'player-wrapper-hidden'}`}>
        <div className='player'>
          <div className='player-section-sm'>
            <FullPlayerOpenBtn className='player-full-btn' />
          </div>
          <div className='player-section-lg'>
            <div className='player-track'>
              <div className='player-track-info'>
                <TrackTitle className='player-track-info-title' />
                <div className='player-track-info-duration'>
                  <TrackCurrentTime /> / <TrackDuration />
                </div>
              </div>
              <div className='player-track-progress-slider'>
                <TimeProgressSlider />
              </div>
            </div>
            <div className='player-controls-wrapper'>
              <div className='player-controls player-control-prev'>    
                <PrevBtn className='player-control-btn' />
              </div>
              <div className='player-controls player-control-play'>    
                <PlayBtn 
                  className='player-control-btn'
                  size='lg' />
              </div>
              <div className='player-controls player-control-next'>    
                <NextBtn className='player-control-btn' />
              </div>
              <div className='player-controls player-control-volume'> 
                <VolumeControl className='player-control-btn player-control-btn-volume' />   
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  track: state.player.track,
});


Player.propTypes = {
  track: PropTypes.object,
};

export default connect(mapStateToProps)(Player);