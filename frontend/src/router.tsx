import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./component/App";
import Playlists from "./component/Playlists";
import PlaylistItem from "./component/PlaylistItems";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Playlists />} />
        <Route path="playlistItems" element={<PlaylistItem />} />
      </Route>
    </Routes>
  );
};

export default Router;
