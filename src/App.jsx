import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import React, { Component } from "react";

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
