import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const TvFav = (props) => {
  const allItems = JSON.parse(localStorage.getItem("arrObjectTv"));

  // const allItems = Object.entries(localStorage);
  // console.log(allItems)

  const clearTv = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <div className="movieTvFav">
      <h2>Tv Favorites!</h2>
      <div>
        {allItems !== null ? (
          <button className="clear" onClick={clearTv}>
            Clear Tv
          </button>
        ) : null}
        {/* {allItems.map((item) => {
          return (
            <div className="results" key={item[1]}>
              <Link to={`/TvPage/${item[1]}`} className="linkName">
                Title: <h3>{item[0]}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w92/` + item.img}
                  alt={item.id}
                />
              </Link>
            </div>
          );
        })} */}
        {allItems !== null ? (
          allItems.map((item) => {
            return (
              <>
                <div className="results" key={item.id}>
                  <Link to={`/TvPage/${item.id}`} className="linkName">
                    <img
                      src={`https://image.tmdb.org/t/p/w92/` + item.img}
                      alt={item.id}
                    />
                  </Link>
                  <div className="body">
                    <h3>{item.name}</h3>
                    <p>{item.overview.slice(0, 200)}...</p>
                  </div>
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
