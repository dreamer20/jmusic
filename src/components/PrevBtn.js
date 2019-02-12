
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';

import { prevTrack } from '../actions/';

class PrevBtn extends Component {
  render() {
    const { previous, className, size } = this.props;

    return (
      <button
        onClick={previous} 
        className={className}>
        <FontAwesomeIcon 
          icon={faStepBackward}
          size={size} />
      </button>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  previous() {
    dispatch(prevTrack());
  },
});

PrevBtn.propTypes = {
  previous: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(PrevBtn);