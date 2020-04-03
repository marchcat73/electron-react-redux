import React, { Component } from 'react';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = { msgFromMainProcess: '' };

  // componentDidMount() {
  //   ipcRenderer.on('event2', (event, data) => {
  //     this.setState({ msgFromMainProcess: data.msg });
  //   });
  // }

  onButtonClick() {
    ipcRenderer.send('categories:get');
  }

  render() {
    return (
      <div>
        <h1>Welcom</h1>
        <p>comm</p>
        <button onClick={this.onButtonClick}>click me</button>
      </div>
    );
  }
}

export default App;
