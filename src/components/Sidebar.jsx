import { FaHeart, FaHistory, FaHome, FaList, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setPlaylist } from "../redux/features/globalSlice";

class Sidebar extends Component {
  state = {
    modalOpen: false,
    playlistUrlInput:
      "https://www.youtube.com/watch?v=9Oa_mWpckns&list=PL0BgiG4bfDwrAVa--1MgGDc3fXkr_NFLF&ab_channel=Meghdol%28%E0%A6%AE%E0%A7%87%E0%A6%98%E0%A6%A6%E0%A6%B2%29Official",
  };

  // handle submit playlist
  handleSubmitPlaylist = async (e) => {
    e.preventDefault();

    if (this.state.playlistUrlInput) {
      const playlistId = this.getPlaylistIdFromUrl(this.state.playlistUrlInput);
      const finalUrl = this.getFinalUrlFromPlaylistId(playlistId);
      this.whenRemoteDataIsAvailableSetDataInStateFromFinalUrl(
        finalUrl,
        playlistId
      );
    }
  }; // end handle submit playlist

  getPlaylistIdFromUrl(link) {
    const url = new URL(link);
    // Parse the URL

    // Get the query parameters
    const queryParams = new URLSearchParams(url.search);

    // Get the playlist ID from the "list" parameter
    const playlistId = queryParams.get("list");

    return playlistId;
  }

  getFinalUrlFromPlaylistId(playlistId) {
    return `https://youtube.googleapis.com/youtube/v3/playlists?id=${playlistId}&part=snippet&key=${
      import.meta.env.VITE_api_key
    }`;
  }

  whenRemoteDataIsAvailableSetDataInStateFromFinalUrl(
    FinalUrlForGetPlaylistData,
    playlistId
  ) {
    fetch(FinalUrlForGetPlaylistData)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          result.playlistId = playlistId;
          // get playlist from localstorage
          const previousLocalData = JSON.parse(localStorage.getItem("data"));

          // check if playlist is already in the localstorage
          if (previousLocalData && previousLocalData.data) {
            const findData = previousLocalData.data.find(
              (etagId) => etagId.etag === result.etag
            );

            // if the playlist is already in the localstorage then return
            if (findData) {
              console.log("Already in the local storage");
              this.setState({ modalOpen: false });
              return;
            }

            // set playlist in state
            this.props.setPlaylist([...previousLocalData.data, result]);

            // if the playlist is not in the localstorage then add it to the localstorage
            localStorage.setItem(
              "data",
              JSON.stringify({
                data: [...previousLocalData.data, result],
              })
            );
          } else {
            localStorage.setItem("data", JSON.stringify({ data: [result] }));

            // set playlist in state
            this.props.setPlaylist([result]);
          }

          this.setState({ modalOpen: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            {children}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-56 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li className="pointer-events-none">
                <h2 className="text-lg font-bold text-secondary uppercase">
                  <FaYoutube /> My Youtube
                </h2>
              </li>
              <div className="divider"></div>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive && "active"}
                >
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/playlist"
                  className={({ isActive }) => isActive && "active"}
                >
                  <FaList /> Playlist
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recent"
                  className={({ isActive }) => isActive && "active"}
                >
                  <FaHistory /> Recent
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favorite"
                  className={({ isActive }) => isActive && "active"}
                >
                  <FaHeart /> Favorite
                </NavLink>
              </li>
              <li>
                <label htmlFor="my_modal_6">
                  <b>+</b> Add Playlist
                </label>
              </li>
            </ul>
          </div>
        </div>
        {/* The button to open modal */}

        <input
          type="checkbox"
          checked={this.state.modalOpen}
          id="my_modal_6"
          className="modal-toggle"
          onChange={() => this.setState({ modalOpen: !this.state.modalOpen })}
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Playlist</h3>
            <div className="divider"></div>
            <p>
              To add a new playlist please insert the playlist id or playlist
              link. Please make sure the link is correct. Otherwise we won't
              able to fetch the playlist information.
            </p>
            <form onSubmit={this.handleSubmitPlaylist}>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Playlist ID or Link</span>
                </label>
                <input
                  type="url"
                  placeholder="Playlist ID or Link"
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      playlistUrlInput: e.target.value,
                    })
                  }
                  value={this.state.playlistUrlInput}
                />
              </div>
              <div className="modal-action">
                <label
                  onClick={() => this.setState({ modalOpen: true })}
                  htmlFor="my_modal_6"
                  className="btn btn-error"
                >
                  cancel
                </label>
                <button className="btn btn-primary" type="submit">
                  add playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Define mapDispatchToProps function to map dispatching actions to props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPlaylist: setPlaylist }, dispatch);
};

export default connect(null, mapDispatchToProps)(Sidebar);
