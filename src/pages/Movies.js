import React from "react";
import Header from "../components/Header";
import DropDown from "../components/DropDown";
import Nav from "../components/Nav";

const Movies = () => {
  return (
    <div className="movie">
      <Header />
      <h2>Discover a new movie!</h2>
      <DropDown />
      <Nav />
    </div>
  );
};

export default Movies;
