import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTracks } from '../actions/';

import Track from './Track';

class Tracklist extends Component {

  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    const { tracks } = this.props;
    return (
      <div>  
        {tracks.map(id => <Track key={id} id={id}/>)}
      </div>  
    )
  }
};


const mapStateToProps = state => ({
  tracks: state.search.results,
});

const mapDispatchToProps = dispatch => ({
  fetchTracks() {
    dispatch(fetchTracks());
  }
});

Tracklist.propTypes = {
  tracks: PropTypes.array,
  fetchTracks: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist);