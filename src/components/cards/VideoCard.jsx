import { bindActionCreators } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { FaExclamationCircle, FaPlay } from "react-icons/fa";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSingleVideoInfo } from "../../redux/features/globalSlice";

class VideoCard extends Component {
  componentDidMount() {
    if (
      this.props.paramsVideoId ===
      this.props.singleVideo?.snippet?.resourceId?.videoId
    ) {
      this.props.setSingleVideo({
        ...this.props.singleVideo,
        videoPosition: this.props.index + 1,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.paramsVideoId ===
      nextProps.singleVideo?.snippet?.resourceId?.videoId
    ) {
      nextProps.setSingleVideo({
        ...nextProps.singleVideo,
        videoPosition: nextProps.index + 1,
      });
    }
  }
  render() {
    const { singleVideo } = this.props;

    return (
      <NavLink
        to={`/video-page/${this.props?.playlistId}/${singleVideo?.snippet?.resourceId?.videoId}`}
        className={`card hover:outline outline-gray-700 bg-base-100 hover:bg-base-200 hover:shadow-none`}
      >
        <div className="card card-side  shadow-xl items-center p-2 ">
          <span className="text-lg font-semibold mr-2">
            {this.props.paramsVideoId ===
            singleVideo?.snippet?.resourceId.videoId ? (
              <FaPlay className="text-sm" />
            ) : (
              `${this.props.index + 1}.`
            )}
          </span>
          <figure>
            {singleVideo?.snippet?.thumbnails?.default ? (
              <img
                src={singleVideo?.snippet?.thumbnails?.default?.url}
                className="w-full rounded-md"
                alt="Movie"
              />
            ) : (
              <FaExclamationCircle className="text-red-500 text-xl" />
            )}
          </figure>
          <div className="card-body p-2 w-1/2">
            <h4 className="font-semibold text-sm">
              {singleVideo?.snippet.title}
            </h4>
          </div>
        </div>
      </NavLink>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setSingleVideo: setSingleVideoInfo }, dispatch);
};

export default connect(null, mapDispatchToProps)(VideoCard);
