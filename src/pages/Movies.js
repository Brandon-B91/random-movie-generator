import React, { useState} from "react";
import Header from "../components/Header";
import DropDown from "../components/DropDown";
import Nav from "../components/Nav";
import MovieSearch from "../components/MovieSearch";
import {FaSearch} from 'react-icons/fa'

const Movies = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const onClick = () => setShow(!show);
  const onClick1 = () => setShow1(!show1);

  return (
    <div className="movie">
      <Header />
      <h2>Discover a new movie!</h2>
      <div className="showBtns">
        <button onClick={onClick} className="right">Search <FaSearch /></button> 
        <button onClick={onClick1}>Discover <FaSearch /></button>
      </div>
      {show1 ? <DropDown /> : null } 
      {show ? <MovieSearch /> : null } 
      <Nav />
    </div>
  );
};

export default Movies;
