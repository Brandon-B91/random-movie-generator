import React from "react";
import { Link } from "react-router-dom";
import TvFavSearch from "./TvFavSearch";

const TvFav = (props) => {
  const allItems = JSON.parse(localStorage.getItem("arrObjectTv"));

  const keys = Object.entries(localStorage);

  const clearTv = (e) => {
    e.preventDefault();
    localStorage.removeItem("arrObjectTv");
    window.location.reload(false);
  };

  return (
    <div className="movieTvFav">
      <h2>Tv Favorites!</h2>
      <div className="tv-results">
        {keys !== null ? (
          keys.map((item) => {
            let id = item[1];
            console.log(id);
            return (
              <>
                <div key={item.id}>
                <TvFavSearch id={id} />;
                </div>
              </>
            );
          })
        ) : (
          <p style={{ padding: "2%" }}>
            Nothing added yet. Go browse in our Tv section to add something!
          </p>
        )}
      </div>
    </div>
  );
};

export default TvFav;
