import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTrackTitle } from '../reducers/';

class TrackDuration extends Component {
  render() {
    const { title, className } = this.props;

    return (
      <div
        title={title} 
        className={className}>
        {title}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  title: getTrackTitle(state)
});

TrackDuration.propTypes = {
  title: PropTypes.string
};

export default connect(mapStateToProps)(TrackDuration);