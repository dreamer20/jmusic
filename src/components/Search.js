import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTracksByName } from '../actions/';

const searchStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px'
};

const inputStyle = {
  flex: '1'
};

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
      <div style={searchStyle}>
        <input style={inputStyle} onChange={this.handleChange} value={value} />
        <button onClick={this.handleClick}>
          Search
        </button>
      </div>
    );
  }
};

const mapStateToDispatch = dispatch => ({
  searchFor(value) {
    dispatch(fetchTracksByName(value))
  }
});

Search.propTypes = {
  searchFor: PropTypes.func.isRequired
};

export default connect(null,mapStateToDispatch)(Search);