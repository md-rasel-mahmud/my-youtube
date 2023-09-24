import {
  FaEllipsisV,
  FaHeart,
  FaHistory,
  FaList,
  FaPlay,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { deletePlaylist } from "../redux/features/globalSlice";

class Home extends Component {
  state = { option: false };

  handleDeleteItem = (etag) => {
    this.props.deletePlaylist(etag);
    this.setState({ option: false });
  };

  render() {
    const { playlist } = this.props;

    console.log(playlist);

    return (
      <section className="p-6">
        <h2 className="text-2xl font-bold">Home</h2>
        <div className="divider"></div>
        <nav className="flex items-center justify-between">
          <h2 className="text-xl flex items-center gap-2 font-semibold">
            <FaHistory /> Recent
          </h2>
          <button className="btn btn-primary btn-sm">see all</button>
        </nav>

        <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-2">
          {playlist && playlist.length > 0 ? (
            playlist.map((item, index) => (
              <div
                key={index}
                className="card hover:shadow-none w-full bg-base-100 shadow-xl"
              >
                <figure className="relative group z-0">
                  <img
                    src={item?.items[0].snippet.thumbnails.high.url}
                    alt={item?.items[0].snippet.title}
                  />
                  <div className="absolute z-40 text-white font-bold gap-2 text-2xl top-0 right-0 bg w-1/2 h-full flex flex-col justify-center items-center bg-black/50 backdrop-blur-sm">
                    <h4>{item?.pageInfo.totalResults}</h4>
                    <FaList className="text-3xl" />
                  </div>
                  <div className="absolute z-50 hidden group-hover:flex group-hover:cursor-pointer text-white font-bold gap-2 text-2xl top-0 right-0 bg w-full h-full  flex-col justify-center items-center bg-black/50 backdrop-blur-md">
                    <h4 className="flex items-center gap-2">
                      <FaPlay /> Play All
                    </h4>
                  </div>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item?.items[0].snippet.title}</h2>
                  <div className="divider"></div>
                  <div className="card-actions justify-between">
                    <Link className="btn btn-ghost btn-sm">
                      View Full Playlist
                    </Link>
                    <div className="relative">
                      <button className="btn btn-ghost rounded-full btn-sm">
                        <FaHeart />
                      </button>
                      <button
                        className="btn btn-ghost rounded-full btn-sm"
                        onClick={() =>
                          this.setState({ option: !this.state.option })
                        }
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
            ))
          ) : (
            <h2 className="text-error text-xl font-bold flex items-center gap-2 bg-base-200 p-2 rounded-lg w-full">
              <FaSearch /> No Playlist found
            </h2>
          )}
        </div>
        <div className="divider"></div>
      </section>
    );
  }
}

const getPlaylistDataFromReduxStore = (state) => {
  return {
    playlist: state.globalSlice.playlistData,
  };
};

const deleteDataAndUpdateState = (dispatch) => {
  return bindActionCreators({ deletePlaylist: deletePlaylist }, dispatch);
};

export default connect(
  getPlaylistDataFromReduxStore,
  deleteDataAndUpdateState
)(Home);
