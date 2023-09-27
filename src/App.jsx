import { Outlet } from "react-router-dom";
import React, { Component } from "react";
import Sidebar from "./components/sidebars/Sidebar";
import { Toaster } from "react-hot-toast";

class App extends Component {
  render() {
    return (
      <main>
        <Sidebar>
          <Outlet />
        </Sidebar>
        <Toaster />
      </main>
    );
  }
}

export default App;
