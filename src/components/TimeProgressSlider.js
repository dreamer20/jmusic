import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/ProgressSlider.css';


class TimeProgressSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      captured: false
    };

    // this.handleClick = this.handleClick.bind(this);
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

    this.props.onCaptured();
    this.props.onTimeProgressChange(progress);
    this.setState({ captured: true });
  }

  handleMouseUp(e) {
    const part = this.clientRect.width / 100;
    let progress = (e.clientX - this.clientRect.left)  / part;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.props.onTimeChange(progress);
    this.setState({ captured: false });
  }

  handleMouseMove(e) {
    const part = this.clientRect.width / 100;
    let progress = (e.clientX - this.clientRect.left)  / part;

    if (progress > 100) {
      progress = 100;
    } else if (progress < 0) {
      progress = 0;
    }

    this.props.onTimeProgressChange(progress);
  }

  handleClick(e) {
    const clientRect = e.currentTarget.getBoundingClientRect();

    
  }

  render() {
    const { timeProgress } = this.props;
    const fillerStyle = {
      width: timeProgress+'%'
    };

    const handlerStyle = {
      opacity: this.state.captured ? '1' : '',
      left: timeProgress+'%'
    }

    return (
      <div
        className='progress-slider'
        onEnter={this.handleEnter}
        onClick={this.handleClick}
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

});

TimeProgressSlider.propTypes = {

};

export default TimeProgressSlider;