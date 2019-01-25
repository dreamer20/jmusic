import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSelectedTrackSource } from '../reducers/'

class Player extends Component {
  constructor(props) {
    super(props);

    this.audioRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.paused) {
      this.audioRef.current.pause();
    } else {
      this.audioRef.current.play();
    }
  }

  render() {
    return (
      <audio
        ref={this.audioRef}
        src={this.props.src} />
    );
  }
};

const mapStateToProps = state => ({
  src: getSelectedTrackSource(state.tracks, state.player.selected),
  paused: state.player.paused
});

Player.propTypes = {
  src: PropTypes.string,
  paused: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Player);