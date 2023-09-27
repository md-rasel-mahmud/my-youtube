import React, { Component } from "react";

class VideoPlayer extends Component {
  render() {
    return (
      <div>
        <iframe
          className="w-full h-[420px] rounded-lg"
          src={`https://www.youtube.com/embed/${this.props.videoId}?autoplay=1`}
          title=""
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  }
}

export default VideoPlayer;
