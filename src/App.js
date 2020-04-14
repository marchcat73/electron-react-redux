import React, { Component } from 'react';
import Category from './components/category';
import Movie from './components/movie';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = { msgFromMainProcess: '' };

  onButtonClick() {
    ipcRenderer.send('categories:get');
  }

  render() {
    return (
      <div>
        <div>
          <Category />
        </div>
        <div>
          <Movie />
        </div>
      </div>
    );
  }
}

export default App;
