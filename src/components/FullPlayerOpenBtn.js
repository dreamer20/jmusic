import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { openFullPlayer } from '../actions/';

class FullPlayerOpenBtn extends Component {
  render() {
    const { open, className } = this.props;

    return (
      <button
        onClick={open} 
        className={className}>
        <FontAwesomeIcon icon={faCaretUp} size='2x' />
      </button>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  open() {
    dispatch(openFullPlayer());
  },
});

FullPlayerOpenBtn.propTypes = {
  open: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(FullPlayerOpenBtn);