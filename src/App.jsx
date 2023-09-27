import { Outlet } from "react-router-dom";
import React, { Component } from "react";
import Sidebar from "./components/sidebars/Sidebar";

class App extends Component {
  render() {
    return (
      <main>
        <Sidebar>
          <Outlet />
        </Sidebar>
      </main>
    );
  }
}

export default App;
