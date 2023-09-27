import React, { Component } from "react";
import { FaHeart, FaHistory, FaHome, FaList, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

class Menu extends Component {
  render() {
    const { buttons } = this.props;
    return (
      <ul className="menu p-4 min-h-full bg-base-200 text-base-content">
        {/* Sidebar content here */}
        <li className="pointer-events-none">
          <h2 className="text-lg font-bold text-secondary uppercase">
            <FaYoutube /> My Youtube
          </h2>
        </li>
        <div className="divider"></div>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive && "active"}>
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
        <li>{buttons}</li>
      </ul>
    );
  }
}

export default Menu;
