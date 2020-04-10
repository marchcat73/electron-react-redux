import React, { Component } from 'react';
import Category from './components/category';

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
      </div>
    );
  }
}

export default App;
