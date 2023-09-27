import { bindActionCreators } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { FaEllipsisV, FaList, FaPlay, FaTimes, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import { deletePlaylist, setPlaylist } from "../../redux/features/globalSlice";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

class PlaylistCard extends Component {
  state = {
    option: false,
    isFavorite: this.props.item.favorite || false,
    isRecent: this.props.item.recent || false,
  };

  handleDeleteItem = (etag) => {
    this.props.deletePlaylist(etag);
    this.setState({ option: false });
  };
  componentDidMount() {
    const findPlaylistData = this.props?.playlistInfo?.find(
      (item) => this.props.item.playlistId === item.playlistId
    );

    this.setState({ ...this.state, isFavorite: findPlaylistData?.favorite });
  }

  handleFavorite = () => {
    const filterCurrentData = this.props.playlistInfo.filter(
      (item) => item.playlistId !== this.props.item.playlistId
    );
    this.setState({ isFavorite: !this.state.isFavorite });

    // set data in redux state
    this.props.setPlaylist([
      ...filterCurrentData,
      { ...this.props.item, favorite: !this.state.isFavorite },
    ]);

    // set update data in localStorage
    localStorage.setItem(
      "data",
      JSON.stringify({
        data: [
          ...filterCurrentData,
          { ...this.props.item, favorite: !this.state.isFavorite },
        ],
      })
    );
  };

  handleRecent = () => {
    const filterCurrentData = this.props.playlistInfo.filter(
      (item) => item.playlistId !== this.props.item.playlistId
    );
    this.setState({ isRecent: !this.state.isRecent });

    // set data in redux state
    this.props.setPlaylist([
      ...filterCurrentData,
      { ...this.props.item, recent: !this.state.isRecent },
    ]);

    // set update data in localStorage
    localStorage.setItem(
      "data",
      JSON.stringify({
        data: [
          ...filterCurrentData,
          { ...this.props.item, recent: !this.state.isRecent },
        ],
      })
    );
  };
  render() {
    const { item } = this.props;

    return (
      <div className="card transition-all hover:outline outline-gray-700 hover:shadow-none w-full bg-base-100 shadow-xl">
        <figure className="relative group z-0">
          <img
            src={item?.items?.[0]?.snippet.thumbnails.high.url}
            alt={item?.items?.[0]?.snippet.title}
          />
          <div className="absolute z-40 text-white font-bold gap-2 text-2xl top-0 right-0 bg w-1/2 h-full flex flex-col justify-center items-center bg-black/50 backdrop-blur-sm">
            <h4>{item?.pageInfo?.totalResults}</h4>
            <FaList className="text-3xl" />
          </div>
          <Link
            onClick={this.handleRecent}
            to={`video-page/${item?.playlistId}/${item?.firstVideoInfo?.videoId}`}
          >
            <div className="absolute z-50 hidden group-hover:flex group-hover:cursor-pointer text-white font-bold gap-2 text-2xl top-0 right-0 bg w-full h-full  flex-col justify-center items-center bg-black/50 backdrop-blur-md">
              <h4 className="flex items-center gap-2">
                <FaPlay /> Play All
              </h4>
            </div>
          </Link>
        </figure>
        <div className="card-body px-2 justify-between">
          <h2 className="font-semibold ">
            {item?.items?.[0]?.snippet.title.slice(0, 40)}
            {item?.items?.[0]?.snippet.title.length > 40 && " ..."}
          </h2>

          <div className="card-actions justify-between border-t border-gray-700 mt-2 pt-2">
            <Link
              onClick={this.handleRecent}
              to={`video-page/${item?.playlistId}/${item?.firstVideoInfo?.videoId}`}
              className="btn btn-ghost btn-xs"
            >
              View Full Playlist
            </Link>
            <div className="relative">
              <button
                onClick={this.handleFavorite}
                className="btn btn-ghost rounded-full btn-xs"
              >
                {this.state.isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              <button
                className="btn btn-ghost rounded-full btn-xs"
                onClick={() => this.setState({ option: !this.state.option })}
              >
                {this.state.option ? <FaTimes /> : <FaEllipsisV />}
              </button>
              {this.state.option && (
                <button
                  onClick={() => this.handleDeleteItem(item?.etag)}
                  className="absolute top-10 right-0 w-max flex items-center justify-end gap-2 btn btn-error  z-50"
                >
                  Remove from list <FaTrash />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchTo = (dispatch) => {
  return bindActionCreators(
    { deletePlaylist: deletePlaylist, setPlaylist: setPlaylist },
    dispatch
  );
};
const mapToPropsState = (state) => {
  return {
    singleVideoInfo: state.globalSlice.singleVideoInfo,
    playlistInfo: state.globalSlice.playlistData,
  };
};
export default connect(mapToPropsState, mapDispatchTo)(PlaylistCard);
