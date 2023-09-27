import { bindActionCreators } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setModalState } from "../../redux/features/globalSlice";

class PlaylistInputForm extends Component {
  render() {
    const {
      setModalState,
      updatePlaylistUrlInput,
      playlistUrlInput,
      handleSubmitPlaylist,
      inputError,
    } = this.props;
    return (
      <form onSubmit={handleSubmitPlaylist}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Playlist ID or Link</span>
          </label>
          <input
            type="url"
            placeholder="Playlist ID or Link"
            className={`input input-bordered w-full ${
              inputError && "input-error"
            }`}
            onChange={updatePlaylistUrlInput}
            value={playlistUrlInput}
          />
          {inputError && (
            <small className="label-text-alt text-error">{inputError}</small>
          )}
        </div>
        <div className="modal-action">
          <label
            onClick={() => setModalState(false)}
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setModalState: setModalState }, dispatch);
};

export default connect(null, mapDispatchToProps)(PlaylistInputForm);
