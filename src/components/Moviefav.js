import React, { Link, useState } from "react";
import { NavLink } from "react-router-dom";
import MovieFavSearch from "./MovieFavSearch";

const Moviefav = () => {

  const clearAll = () => {
    localStorage.clear()
    window.location.reload()
  }

  const key = Object.keys(localStorage);

  return (
    <div className="movieTvFav">
      <h2>Favorites!</h2> 
      <button onClick={clearAll}>Clear all</button>
      <div className="tv-results">
        {key.length > 0
          ? key.map((item) => {
              encodeURI(item);
              return (
                <div>
                  <MovieFavSearch item={item} />
                </div>
              );
            })
          : `Looks empty in here! go browse in the Movies or T.V sections to add something!`}
      </div>
    </div>
  );
};

export default Moviefav;
