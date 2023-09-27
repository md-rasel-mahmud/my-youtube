import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

import Recent from "../pages/Recent";
import Favorite from "../pages/Favorite";
import VideoLayout from "../pages/VideoLayout";
import VideoPage from "../components/videoLayout/VideoPage";
import AllPlaylist from "../pages/AllPlaylist";

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
        element: <AllPlaylist />,
      },
      {
        path: "recent",
        element: <Recent />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "video-page/:playlistId/",
        element: <VideoLayout />,
        children: [
          {
            path: ":videoId",
            element: <VideoPage />,
          },
        ],
      },
    ],
  },
]);
