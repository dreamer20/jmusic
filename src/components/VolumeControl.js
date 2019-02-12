import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/VolumeControl.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute,
         faVolumeUp,
         faVolumeDown } from '@fortawesome/free-solid-svg-icons';

import { setVolume } from '../actions/';

class VolumeControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.handleVolumeMute = this.handleVolumeMute.bind(this);
    this.handleVolumeUp = this.handleVolumeUp.bind(this);
  }

  handleFocus() {
    this.setState({ isOpen: true });
  }

  handleBlur() {
    this.setState({ isOpen: false });
  }

  handleMouseDown(e) {
    this.clientRect = e.currentTarget.getBoundingClientRect();
    const part = this.clientRect.height / 100;
    let volume = (e.clientY - this.clientRect.top)  / part;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    volume = 100 - volume;
    volume = volume / 100;
    this.props.setVolume(volume);
  }

  handleMouseUp(e) {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e) {
    const part = this.clientRect.height / 100;
    let volume = (e.clientY - this.clientRect.top)  / part;
    volume = 100 - volume;

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
    const { isOpen } = this.state;
    return (
      <button
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}>
        <div 
          className='volume-control'
          style={{ display: isOpen ? 'flex' : 'none'}}>
          <div 
            className='volume-control-btn'
            onClick={this.handleVolumeUp}>
              <FontAwesomeIcon icon={faVolumeUp} />
          </div>
          <div 
            className='volume-control-slider'
            onMouseDown={this.handleMouseDown}>
            <div 
              className='volume-control-slider-filler'
              style={{height: `${volume * 100}%`}}>
            </div>
          </div>
          <div 
            className='volume-control-btn'
            onClick={this.handleVolumeMute}>
            <FontAwesomeIcon icon={faVolumeMute} />
          </div>
        </div>
        <FontAwesomeIcon icon={getVolumeIcon(volume)}/>
      </button>
    );
  }
};

const getVolumeIcon = volume => {
  if (volume < 0.4 && volume !== 0) {
    return faVolumeDown;
  } else if (volume === 0) {
    return faVolumeMute;
  }

  return faVolumeUp;
};

const mapStateToProps = state => ({
  volume: state.player.volume
});

const mapDispatchToProps = dispatch => ({
  setVolume(volume) {
    dispatch(setVolume(volume))
  }
});

VolumeControl.propTypes = {
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControl);