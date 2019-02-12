import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTimeString } from '../helperFunctions';

import { getTrackDuration } from '../reducers/';

class TrackDuration extends Component {
  render() {
    const { duration } = this.props;

    return duration ? getTimeString(duration) : '00:00';
  }
};

const mapStateToProps = state => ({
  duration: getTrackDuration(state)
});

TrackDuration.propTypes = {
  duration: PropTypes.number
};

export default connect(mapStateToProps)(TrackDuration);