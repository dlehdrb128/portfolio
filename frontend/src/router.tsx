import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./component/App";
import Content from "./component/Content";
import Test from "./component/Test";
import Test2 from "./component/Test2";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Content />} />
        <Route path="playlistItems" element={<Test2 />} />
      </Route>
    </Routes>
  );
};

export default Router;
