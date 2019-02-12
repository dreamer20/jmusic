import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/VolumeControlFull.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute,
         faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import { setVolume } from '../actions/';

class VolumeControlFull extends Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.handleVolumeMute = this.handleVolumeMute.bind(this);
    this.handleVolumeUp = this.handleVolumeUp.bind(this);
  }

  handleMouseDown(e) {
    this.clientRect = e.currentTarget.getBoundingClientRect();
    const part = this.clientRect.width / 100;
    let volume = (e.clientX - this.clientRect.left)  / part;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    volume = volume / 100;
    this.props.setVolume(volume);
  }

  handleMouseUp(e) {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e) {
    const part = this.clientRect.width / 100;
    let volume = (e.clientX - this.clientRect.left)  / part;

    if (volume > 100) {
      volume =  100;
    } else if (volume < 0) {
      volume = 0;
    }

    volume = volume / 100;
    this.props.setVolume(volume);
  }

  handleVolumeUp() {
    this.props.setVolume(1);
  }

  handleVolumeMute() {
    this.props.setVolume(0);
  }

  render() {
    const { volume, className } = this.props;
    return (
      <div 
        className='volume-control-full'>
        <div
          title='Выключить звук'
          className='volume-control-full-btn-wrapper'>
          <div 
            className='volume-control-full-btn'
            onClick={this.handleVolumeMute}>
            <FontAwesomeIcon icon={faVolumeMute} size='lg' />
          </div>
        </div>
        <div 
          className='volume-control-full-slider'
          onMouseDown={this.handleMouseDown}>
          <div 
            className='volume-control-full-slider-filler'
            style={{width: `${volume * 100}%`}}>
          </div>
        </div>
        <div
          title='Полная громкость'
          className='volume-control-full-btn-wrapper'>
            <div 
              className='volume-control-full-btn'
              onClick={this.handleVolumeUp}>
              <FontAwesomeIcon icon={faVolumeUp} size='lg' />
            </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  volume: state.player.volume
});

const mapDispatchToProps = dispatch => ({
  setVolume(volume) {
    dispatch(setVolume(volume))
  }
});

VolumeControlFull.propTypes = {
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControlFull);