import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Playlist from "../pages/Playlist";
import Recent from "../pages/Recent";
import Favorite from "../pages/Favorite";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "playlist",
        element: <Playlist />,
      },
      {
        path: "recent",
        element: <Recent />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
    ],
  },
]);
