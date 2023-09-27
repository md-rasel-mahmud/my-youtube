import React, { Component } from "react";
import Favorite from "./Favorite";
import AllPlaylist from "./AllPlaylist";
import Recent from "./Recent";

class Home extends Component {
  render() {
    return (
      <>
        {/* Recent playlist  */}
        <Recent />

        {/* All playlist  */}
        <AllPlaylist />

        {/* Favorite playlist  */}
        <Favorite />
      </>
    );
  }
}

export default Home;
