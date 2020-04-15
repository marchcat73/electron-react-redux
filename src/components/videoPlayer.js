import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

export default class VideoPlayer extends Component {
  componentDidMount() {
    /** instantiate Video.js */
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  /** destroy player on unmount */
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={(node) => (this.videoNode = node)}
            className="video-js"
          ></video>
        </div>
      </div>
    );
  }
}
