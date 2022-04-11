import React, { useState} from "react";
import Header from "../components/Header";
import DropDown from "../components/DropDown";
import Nav from "../components/Nav";
import MovieSearch from "../components/MovieSearch";
import {FaSearch} from 'react-icons/fa'

const Movies = () => {
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
    <div className="movie">
      <Header />
      <h2>Discover a new movie!</h2>
      <div className="showBtns">
        <button onClick={showSearchDiv} className="right">Search <FaSearch /></button> 
        <button onClick={showRandomDiv}>Discover <FaSearch /></button>
      </div>
     {showRandom ? <DropDown /> : null}
     {showSearch ? <MovieSearch />: null}
      <Nav />
    </div>
  );
};

export default Movies;
