import React, { Component } from "react";
import { connect } from "react-redux";
import { FaHeart } from "react-icons/fa";
import Playlist from "../components/playlist/Playlist";

class Favorite extends Component {
  state = { option: false };

  render() {
    const { playlist } = this.props;
    const favorite = playlist.filter((item) => item.favorite);

    return (
      <Playlist
        icon={<FaHeart />}
        path="favorite"
        title="Favorite Playlist"
        playlist={favorite}
      />
    );
  }
}

const getPlaylistDataFromReduxStore = (state) => {
  return {
    playlist: state.globalSlice.playlistData,
  };
};

export default connect(getPlaylistDataFromReduxStore)(Favorite);
