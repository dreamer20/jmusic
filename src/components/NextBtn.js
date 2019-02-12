import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward } from '@fortawesome/free-solid-svg-icons';

import { nextTrack } from '../actions/';

class NextBtn extends Component {
  render() {
    const { next, className, size } = this.props;

    return (
      <button
        onClick={next} 
        className={className}>
        <FontAwesomeIcon 
          icon={faStepForward}
          size={size} />
      </button>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  next() {
    dispatch(nextTrack());
  },
});

NextBtn.propTypes = {
  next: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(NextBtn);