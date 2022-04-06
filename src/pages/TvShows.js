import React from "react";
import Header from "../components/Header";
import DropDownTv from "../components/DropDownTv";
import Nav from "../components/Nav"

const TvShows = () => {
  return (
    <div className="tv">
      <Header />
      <h2>Discover a new tv show!</h2>
      <DropDownTv />
      <Nav />
    </div>
  );
};

export default TvShows;
