import React, { Component } from "react";
import { Outlet, useParams } from "react-router-dom";
import PlaylistSidebar from "../components/sidebars/PlaylistSidebar";
import { getPlaylistItems } from "../services/apiService";

const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

class VideoLayout extends Component {
  state = { videoPlaylist: [] };
  componentDidMount() {
    getPlaylistItems(this.props.params.playlistId).then(([, playlistItems]) =>
      this.setState({ ...this.state, videoPlaylist: [...playlistItems] })
    );
  }

  render() {
    return (
      <div>
        <PlaylistSidebar
          videoPlaylist={this.state.videoPlaylist}
          playlistId={this.props.params.playlistId}
        />
        <div className="md:w-3/4">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default withParams(VideoLayout);
