import React, { Component } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { connect } from "react-redux";
import { getPlaylistInfo } from "../../services/apiService";
import { Link, useParams } from "react-router-dom";
import { bindActionCreators } from "@reduxjs/toolkit";
import { setPlaylist } from "../../redux/features/globalSlice";
import toast from "react-hot-toast";

const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

class VideoInfo extends Component {
  state = {
    playlistInfo: null,
    videoInfo: null,
    isFavorite: null,
  };
  componentDidMount() {
    const playlistId = this.props.params.playlistId;
    getPlaylistInfo(playlistId).then((res) =>
      this.setState({
        ...this.state,
        playlistInfo: res,
        videoInfo: this.props.singleVideoInfo,
      })
    );

    const findPlaylistData = this.props?.playlistInfo?.find(
      (item) => playlistId === item.playlistId
    );

    this.setState({
      ...this.state,
      isFavorite: findPlaylistData?.favorite,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ videoInfo: nextProps.singleVideoInfo });
  }

  handleFavorite = () => {
    const filterCurrentData = this.props.playlistInfo.filter(
      (item) => item.playlistId !== this.state.playlistInfo.playlistId
    );
    this.setState({ isFavorite: !this.state.isFavorite });

    // set data in redux state
    this.props.setPlaylist([
      ...filterCurrentData,
      { ...this.state.playlistInfo, favorite: !this.state.isFavorite },
    ]);

    //show toast
    this.state.isFavorite
      ? toast.success("Removed from favorite")
      : toast.success(" Added to favorite");

    // set update data in localStorage
    localStorage.setItem(
      "data",
      JSON.stringify({
        data: [
          ...filterCurrentData,
          { ...this.state.playlistInfo, favorite: !this.state.isFavorite },
        ],
      })
    );
  };

  render() {
    return (
      <>
        {this.state?.videoInfo?.snippet ? (
          <div className="mt-2 flex flex-col gap-3">
            <h2 className="text-3xl">{this.state.videoInfo?.snippet.title}</h2>
            <div className="flex items-center justify-between mt-2">
              <Link
                to={`https://www.youtube.com/channel/${this.state.videoInfo?.snippet.channelId}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                {this.state.videoInfo?.snippet.channelTitle}
              </Link>

              <button
                onClick={this.handleFavorite}
                className="btn btn-ghost btn-circle text-xl"
              >
                {this.state.isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 font-semibold">
              <p className="text-sm">
                {this.props.singleVideoInfo?.videoPosition}/
                {this.state?.playlistInfo?.pageInfo.totalResults} Videos
              </p>
              <p className="text-sm">
                Uploaded:
                {new Date(
                  this.state.videoInfo?.snippet.publishedAt
                ).toDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg">Description: </h4>
              <p>{this.state.videoInfo?.snippet.description}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center my-3">
            <div className="text-center loading loading-dots loading-lg"></div>
          </div>
        )}
      </>
    );
  }
}

const mapToPropsState = (state) => {
  return {
    singleVideoInfo: state.globalSlice.singleVideoInfo,
    playlistInfo: state.globalSlice.playlistData,
  };
};

const mapToPropsDispatch = (dispatch) => {
  return bindActionCreators({ setPlaylist: setPlaylist }, dispatch);
};

export default connect(
  mapToPropsState,
  mapToPropsDispatch
)(withParams(VideoInfo));
