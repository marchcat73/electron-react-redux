import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './components/category';
import Movie from './components/movie';
import Player from './components/player';
import './App.scss';

class App extends Component {
  render() {
    if (this.props.movie.selectedMovie)
      return (
        <div className="app__movie">
          <Player />
        </div>
      );
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
