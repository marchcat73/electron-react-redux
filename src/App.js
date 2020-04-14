import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './components/category';
import Movie from './components/movie';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = { msgFromMainProcess: '' };

  onButtonClick() {
    ipcRenderer.send('categories:get');
  }

  render() {
    if (this.props.movie.selectedMovie)
      return <div>{this.props.movie.selectedMovie}</div>;
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

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
  };
};

export default connect(mapStateToProps)(App);
