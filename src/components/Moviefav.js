import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieFavSearch from "./MovieFavSearch";

const Moviefav = () => {
  const key = Object.values(localStorage);

  return (
    <div className="movieTvFav">
      <h2>Favorites!</h2>
      <div className="tv-results">
        {key.map((item) => {
          encodeURI(item);
          console.log(item);
          return (
            <div>
              <MovieFavSearch item={item} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Moviefav;
