import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Track from './Track';

import '../styles/Playlist.css';

class Playlist extends Component {
  render() {
    const { tracks } = this.props;

    return (
      <div className='playlist'>
        {tracks.map(id => <Track key={id} id={id}/>)}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  tracks: state.tracks.inPlaylist
});

Playlist.propTypes = {
  tracks: PropTypes.array
};

export default connect(mapStateToProps)(Playlist);