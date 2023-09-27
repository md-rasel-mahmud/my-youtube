import React, { Component } from "react";
import { connect } from "react-redux";
import { FaList } from "react-icons/fa";
import Playlist from "../components/playlist/Playlist";

class AllPlaylist extends Component {
  state = { option: false };

  render() {
    const { playlist } = this.props;

    return (
      <Playlist icon={<FaList />} playlist={playlist} title="All Playlist" />
    );
  }
}

const getPlaylistDataFromReduxStore = (state) => {
  return {
    playlist: state.globalSlice.playlistData,
  };
};

export default connect(getPlaylistDataFromReduxStore)(AllPlaylist);
