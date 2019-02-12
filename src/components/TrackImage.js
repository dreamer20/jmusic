import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTrackImage } from '../reducers/';

const style = {
  width: '100%',
  height: '100%',
  display: 'block'
};

class TrackImage extends Component {
  render() {
    return (<img style={style} src={this.props.src} />);
  }
};

const mapStateToProps = state => ({
  src: getTrackImage(state)
});

TrackImage.propTypes = {
  src: PropTypes.string
};

export default connect(mapStateToProps)(TrackImage);