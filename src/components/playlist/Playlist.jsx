import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import PlaylistCard from "../cards/PlaylistCard";
import { Link } from "react-router-dom";

class Playlist extends Component {
  state = { option: false };

  handleDeleteItem = (etag) => {
    this.props.deletePlaylist(etag);
    this.setState({ option: false });
  };

  render() {
    const { playlist, title, icon, path } = this.props;
    return (
      <section className="p-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="divider"></div>
        <nav className="flex items-center justify-between">
          <h2 className="text-xl flex items-center gap-2 font-semibold">
            {icon} {title}
          </h2>
          <Link to={path || "playlist"} className="btn btn-primary btn-sm">
            see all
          </Link>
        </nav>

        <div className="my-4 grid grid-cols-1 md:grid-cols-4 gap-2">
          {playlist && playlist.length > 0 ? (
            playlist.map((item, index) => (
              <PlaylistCard item={item} key={index} />
            ))
          ) : (
            <h2 className="text-error text-xl font-bold flex items-center gap-2 bg-base-200 p-2 rounded-lg w-full">
              <FaSearch /> No {title || ""} found
            </h2>
          )}
        </div>
        <div className="divider"></div>
      </section>
    );
  }
}

export default Playlist;
