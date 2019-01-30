import React, { Component } from 'react';

import Tracklist from './components/Tracklist';
import Player from './components/Player';
import Search from './components/Search';

const AppStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
};

const titleStyle = {
  textAlign: 'center',
  color: '#90bfb3'
};

class App extends Component {
  render() {
    return (
      <div style={AppStyle}>
        <div style={{ width: '250px' }}>
          <h2 style={titleStyle}>
            Find Your Music!
          </h2>
          <Search />
          <Tracklist />
          <Player />
        </div>
      </div>
    );
  }
};

export default App;
