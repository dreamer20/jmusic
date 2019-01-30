import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { findTracksByName } from '../actions/';

import '../styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({ value: target.value });
  }

  handleClick() {
    this.props.searchFor(this.state.value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className='search'>
        <input className='search-input' onChange={this.handleChange} value={value} />
        <button className='search-btn' onClick={this.handleClick}>
          Search
        </button>
      </div>
    );
  }
};

const mapStateToDispatch = dispatch => ({
  searchFor(value) {
    dispatch(findTracksByName(value))
  }
});

Search.propTypes = {
  searchFor: PropTypes.func.isRequired
};

export default connect(null,mapStateToDispatch)(Search);