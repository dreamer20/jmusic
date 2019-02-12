import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTimeString } from '../helperFunctions';

class TrackCurrentTime extends Component {
  render() {
    const { currentTime } = this.props;

    return currentTime ? getTimeString(currentTime) : '00:00';
  }
};

const mapStateToProps = state => ({
  currentTime: state.player.currentTime
});

TrackCurrentTime.propTypes = {
  currentTime: PropTypes.number
};

export default connect(mapStateToProps)(TrackCurrentTime);