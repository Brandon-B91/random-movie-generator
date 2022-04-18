import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from '../components/Nav'
import { Link } from "react-router-dom";

const Favorites = () => {
  const [items, setItems] = useState();

  const name = JSON.parse(localStorage.getItem("name"));
  const img = JSON.parse(localStorage.getItem("img"));
  const id = JSON.parse(localStorage.getItem("id"));
  const overview = JSON.parse(localStorage.getItem("overview"));

  return (
    <>
    <Header />
      <div className="favPage">
        <div className="results">
          <Link to={`/MoviePage/${id}`} className="linkName">
            <img
              src={`https://image.tmdb.org/t/p/w92/` + img}
              alt="movie poster"
            />
          </Link>
          <div className="body">
            <h2>{name}</h2>
            <p>{overview}</p>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Favorites;
