import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { closeFullPlayer } from '../actions/';

class FullPlayerCloseBtn extends Component {
  render() {
    const { close, className } = this.props;

    return (
      <button
        onClick={close} 
        className={className}>
        <FontAwesomeIcon icon={faCaretDown} size='2x' />
      </button>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  close() {
    dispatch(closeFullPlayer());
  },
});

FullPlayerCloseBtn.propTypes = {
  close: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(FullPlayerCloseBtn);