import React, { Component } from "react";
import { connect } from "react-redux";
import Playlist from "../components/playlist/Playlist";
import { FaHistory } from "react-icons/fa";

class Recent extends Component {
  render() {
    const { playlist } = this.props;
    const recent = playlist.filter((item) => item.recent);
    return (
      <Playlist
        playlist={recent}
        icon={<FaHistory />}
        path="recent"
        title="Recent Playlist"
      />
    );
  }
}
const mapToPropsState = (state) => {
  return {
    playlist: state.globalSlice.playlistData,
  };
};

export default connect(mapToPropsState)(Recent);
