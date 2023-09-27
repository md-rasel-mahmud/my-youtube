import React, { Component } from "react";
import { getCommentsThreads } from "../../services/apiService";
import SingleChat from "../cards/SingleChat";
import { FaSearch } from "react-icons/fa";

class VideoComments extends Component {
  state = { commentsThreads: null, videoIdState: null };

  updateCommentInfo() {
    this.setState({ videoIdState: this.props.videoId });
    getCommentsThreads(this.props.videoId).then(
      (res) => !res.error && this.setState({ commentsThreads: res })
    );
  }

  componentDidMount() {
    this.updateCommentInfo();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.videoId !== this.state.videoIdState) {
      this.updateCommentInfo();
    }
  }
  render() {
    return (
      <>
        {this.state?.commentsThreads ? (
          <>
            <div className="divider"></div>
            <h4 className="font-bold text-lg my-2">Comments: </h4>

            {this.state?.commentsThreads?.items.map((comment) => (
              <SingleChat comments={comment} />
            ))}
          </>
        ) : (
          <h2 className="text-error text-xl font-bold flex items-center gap-2 my-2 bg-base-200 p-2 rounded-lg w-full">
            <FaSearch /> No Comments found
          </h2>
        )}
      </>
    );
  }
}

export default VideoComments;
