import React, { Component } from "react";
import VideoInfo from "./VideoInfo";
import { useParams } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import VideoComments from "./VideoComments";

const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

class VideoPage extends Component {
  render() {
    return (
      <div className="px-2 pt-2 w-[94%] h-screen overflow-auto">
        <VideoPlayer videoId={this.props.params.videoId} />
        <VideoInfo />
        <VideoComments videoId={this.props.params.videoId} />
      </div>
    );
  }
}

export default withParams(VideoPage);
