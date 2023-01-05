import React from "react";
import { Link } from "react-router-dom";
import TvFavSearch from "./TvFavSearch";

const TvFav = () => {
  const key = Object.values(localStorage)

  return (
    <div className="movieTvFav">
      <h2>Movie Favorites!</h2>
      <div className="tv-results"> 
          {key.map((item) => {
            let id = JSON.parse(item)
            console.log(id.name)
            return (
              <>
                <div>
                <TvFavSearch id={id.name} />;
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default TvFav;
