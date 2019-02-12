import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,
         faPause } from '@fortawesome/free-solid-svg-icons';

import { playTrack,
         stopTrack } from '../actions/';

class PlayBtn extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { paused, play, pause } = this.props;

    if (paused) {
      play();
    } else {
      pause();
    }
  }

  render() {
    const { paused, className, size } = this.props;

    return (
      <button
        onClick={this.handleClick} 
        className={className}>
        <FontAwesomeIcon 
          icon={ paused ? faPlay : faPause} 
          size={size} />
      </button>
    );
  }
};

const mapStateToProps = state => ({
  paused: state.player.paused
});

const mapDispatchToProps = dispatch => ({
  play() {
    dispatch(playTrack());
  },
  pause() {
    dispatch(stopTrack());
  }
});

PlayBtn.propTypes = {
  paused: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayBtn);