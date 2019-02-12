import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/ProgressSlider.css';

import { getTrackDuration } from '../reducers/';

import { setCurrentTime, captureTimeSlider, releaseTimeSlider } from '../actions/';

class TimeProgressSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(e) {
    this.clientRect = e.currentTarget.getBoundingClientRect();
    const part = this.clientRect.width / 100;
    let progress = (e.clientX - this.clientRect.left)  / part;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.props.captureSlider();
    this.setState({ progress: progress });
  }

  handleMouseUp(e) {
    const part = this.clientRect.width / 100;
    let progress = (e.clientX - this.clientRect.left)  / part;
    let durationPart = this.props.duration / 100;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    if (progress > 100) {
      progress = 100;
    } else if (progress < 0) {
      progress = 0;
    }
    this.props.setCurrentTime(Math.round(durationPart * progress));
    this.props.releaseSlider();
  }

  handleMouseMove(e) {
    const part = this.clientRect.width / 100;
    let progress = (e.clientX - this.clientRect.left)  / part;

    if (progress > 100) {
      progress = 100;
    } else if (progress < 0) {
      progress = 0;
    }

    this.setState({ progress: progress });
  }

  render() {
    const { duration,
            currentTime,
            sliderCaptured,
            large } = this.props;
    const { progress } = this.state;
    let timeProgress = 0;

    if (duration) {
      const part = duration / 100;
      timeProgress = currentTime / part ;
    }

    const progressSliderStyle = {
      padding: large ? '' : '3px 0'
    };
    const fillerStyle = {
      width: (sliderCaptured ? progress : timeProgress) + '%'
    };
    const handlerStyle = {
      opacity: sliderCaptured ? '1' : '',
      left: (sliderCaptured ? progress : timeProgress) + '%',
      width: `${large ? 16 : 8}px`,
      height: `${large ? 16 : 8}px`
    };

    return (

      <div
        className='progress-slider'
        style={progressSliderStyle}
        onMouseDown={this.handleMouseDown}>
        <div className='progress-slider_line'>
          <div
            className='progress-slider_filler' 
            style={fillerStyle}>
          </div>
          <div
            style={handlerStyle}
            className='progress-slider_handler'>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  duration: getTrackDuration(state),
  currentTime: state.player.currentTime,
  sliderCaptured: state.player.timeSliderCaptured
});

const mapDispatchToProps = dispatch => ({
  setCurrentTime(time) {
    dispatch(setCurrentTime(time));
  },
  captureSlider() {
    dispatch(captureTimeSlider());
  },
  releaseSlider() {
    dispatch(releaseTimeSlider());
  }
});

TimeProgressSlider.propTypes = {
  duration: PropTypes.number.isRequired,
  large: PropTypes.bool,
  currentTime: PropTypes.number.isRequired,
  sliderCaptured: PropTypes.bool.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  captureSlider: PropTypes.func.isRequired,
  releaseSlider: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeProgressSlider);