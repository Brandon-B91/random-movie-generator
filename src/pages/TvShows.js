import React, { useState } from "react";
import Header from "../components/Header";
import DropDownTv from "../components/DropDownTv";
import TvSearch from "../components/TvSearch";
import Nav from "../components/Nav";
import { FaSearch } from "react-icons/fa";

const TvShows = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showRandom, setShowRandom] = useState(false);

  const showSearchDiv = () => {
    setShowSearch((isVisible) => !isVisible);
    setShowRandom(false);
  };

  const showRandomDiv = () => {
    setShowRandom((isVisible) => !isVisible);
    setShowSearch(false);
  };
  return (
    <div className="movie">
      <Header />
      <h2>Discover a new Tv show!</h2>
      <p>You can search for a Tv show or discover a new one!</p>
      <div className="showBtns">
        <button onClick={showSearchDiv}>
          Search <FaSearch />
        </button>
        <button onClick={showRandomDiv}>
          Discover <FaSearch />
        </button>
      </div>
      {showRandom ? <DropDownTv /> : null}
      {showSearch ? <TvSearch /> : null}
      <Nav />
    </div>
  );
};

export default TvShows;
