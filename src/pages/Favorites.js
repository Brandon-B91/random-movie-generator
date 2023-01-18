import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import MovieFav from "../components/Moviefav";


const Favorites = () => {
  return (
    <>
      <Header />
      <div className="favPage">
        <MovieFav />
      </div>
      <Nav />
    </>
  );
};

export default Favorites;
