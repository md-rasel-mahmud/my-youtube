import React, { Component } from "react";

class SingleChat extends Component {
  render() {
    const {
      comments: { snippet },
    } = this.props;

    return (
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt={snippet.topLevelComment.snippet.authorDisplayName}
            />
          </div>
        </div>
        <div className="chat-header">
          {snippet.topLevelComment.snippet.authorDisplayName}
          <time className="text-xs opacity-50 ml-3">
            {new Date(snippet.topLevelComment.snippet.updatedAt).toDateString()}
          </time>
        </div>
        <div className="chat-bubble">
          {snippet.topLevelComment.snippet.textOriginal}
        </div>
      </div>
    );
  }
}

export default SingleChat;
