import React, { Component, Fragment } from 'react';

import Tracklist from './components/Tracklist';
import Player from './components/Player';
import FullPlayer from './components/FullPlayer';
import Search from './components/Search';
import Audio from './components/Audio';

const AppStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '48px'
};

const titleStyle = {
  textAlign: 'center',
  color: '#90bfb3'
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <div style={AppStyle}>
          <div style={{ width: '320px' }}>
            <h2 style={titleStyle}>
              Find Your Music!
            </h2>
            <Search />
            <Tracklist />
          </div>
        </div>
          <Player />
        <FullPlayer />
        <Audio />
      </Fragment>
    );
  }
};

export default App;
