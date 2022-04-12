import React, {useState} from "react";
import Header from "../components/Header";
import DropDownTv from "../components/DropDownTv";
import TvSearch from "../components/TvSearch";
import Nav from "../components/Nav";
import {FaSearch} from 'react-icons/fa'

const TvShows = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showRandom, setShowRandom] = useState(false);

  const showSearchDiv = () => {
    setShowSearch((isVisible) => !isVisible)
    setShowRandom(false)
  }

  const showRandomDiv = () => {
    setShowRandom((isVisible) => !isVisible)
    setShowSearch(false)
  }
  return (
    <div className="tv">
      <Header />
      <h2>Discover a new tv show!</h2>
      <div className="showBtns">
        <button onClick={showSearchDiv} className="right">
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
