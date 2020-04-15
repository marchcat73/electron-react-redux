import React, { Component } from 'react';
import VideoPlayer from './videoPlayer';
import { connect } from 'react-redux';
import { closeMovie } from '../actions/movie';

class Player extends Component {
  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      fluid: true,
      nativeControlsForTouch: true,
      controlBar: {
        fullscreenToggle: false,
      },
      sources: [
        {
          src: this.props.selectedMovie,
          type: 'video/mp4',
        },
      ],
    };
    return (
      <div>
        <VideoPlayer {...videoJsOptions} />
        <div
          className="movie-close-btn"
          onClick={() => this.props.closeMovie()}
        >
          <img src="icons/cancel-circle-01.svg" alt="close" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ movie }) => {
  return movie;
};

export default connect(mapStateToProps, { closeMovie })(Player);
