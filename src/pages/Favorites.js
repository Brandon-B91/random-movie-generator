import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import TvFav from "../components/TvFav";
import MovieFav from "../components/Moviefav";
import { Link } from "react-router-dom";

const Favorites = () => {
  return (
    <>
      <Header />
      <div className="favPage">
        <MovieFav />
        {/* <TvFav /> */}
      </div>
      <Nav />
    </>
  );
};

export default Favorites;
