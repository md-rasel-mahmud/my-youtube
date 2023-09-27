import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setModalState, setPlaylist } from "../../redux/features/globalSlice";
import { getPlaylistIdFromUrl } from "../../helper/getPlaylistIdFromUrl";
import { getPlaylistInfo } from "../../services/apiService";
import { setPlaylistLocalStorage } from "../../helper/setPlaylistLocalStorage";
import Menu from "../menu/Menu";
import ModalBtn from "../modal/ModalBtn";
import Modal from "../modal/Modal";
import PlaylistInputForm from "../playlistInput/PlaylistInputForm";

class Sidebar extends Component {
  state = {
    modalOpen: false,
    inputError: "",
    playlistUrlInput:
      "https://www.youtube.com/playlist?list=PLNeGQWc298uwyXJrdNMLpRgw2qHvRxFgB",
  };

  // handle submit playlist
  handleSubmitPlaylist = async (e) => {
    e.preventDefault();

    if (this.state.playlistUrlInput) {
      const playlistId = getPlaylistIdFromUrl(this.state.playlistUrlInput);

      if (playlistId) {
        const data = await getPlaylistInfo(playlistId);

        // set data in localStorage
        const findForLocalStorageConflict = setPlaylistLocalStorage(
          data,
          this.props.playlistData
        );

        if (findForLocalStorageConflict) {
          // set data in redux
          this.props.setPlaylist([...this.props.playlistData, data]);
        }
      } else {
        this.setState({
          ...this.state,
          inputError: "Invalid youtube playlist url",
        });
      }
      this.props.setModalState(false);
    }
  };

  render() {
    const { children } = this.props;
    const updatePlaylistUrlInput = ({ target: { value } }) => {
      this.setState({ ...this.state, playlistUrlInput: value });
    };

    return (
      <div>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
            {/* Page content here */}
            {children}
          </div>
          <div className="drawer-side md:w-1/4">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <Menu buttons={<ModalBtn title="+ Add playlist" />} />
          </div>
        </div>

        {/* Playlist url input Modal  */}
        <Modal
          title="Add playlist"
          description="To add a new playlist please insert the playlist id or playlist link. Please make sure the link is correct. Otherwise we won't able to fetch the playlist information."
        >
          <PlaylistInputForm
            updatePlaylistUrlInput={updatePlaylistUrlInput}
            playlistUrlInput={this.state.playlistUrlInput}
            handleSubmitPlaylist={this.handleSubmitPlaylist}
            inputError={this.state.inputError}
          />
        </Modal>
      </div>
    );
  }
}

// Define mapDispatchToProps function to map dispatching actions to props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setPlaylist: setPlaylist, setModalState: setModalState },
    dispatch
  );
};

const mapToPropsState = (state) => {
  return state.globalSlice;
};

export default connect(mapToPropsState, mapDispatchToProps)(Sidebar);
