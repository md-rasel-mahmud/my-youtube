import React, { Component } from "react";
import VideoCard from "../cards/VideoCard";
import { useParams } from "react-router-dom";

const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

class PlaylistSidebar extends Component {
  render() {
    return (
      <div className="fixed right-0 flex flex-col gap-3 h-screen overflow-auto bg-base-300 shadow-md w-1/4 py-4 px-2">
        {this.props.videoPlaylist.length > 0 ? (
          this.props.videoPlaylist.map((video, index) => (
            <VideoCard
              key={index}
              singleVideo={video}
              playlistId={this.props.playlistId}
              paramsVideoId={this.props.params.videoId}
              index={index}
            />
          ))
        ) : (
          <div className="flex justify-center my-3">
            <div className="text-center loading loading-dots loading-lg"></div>
          </div>
        )}
      </div>
    );
  }
}

export default withParams(PlaylistSidebar);
