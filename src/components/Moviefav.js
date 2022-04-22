import React from "react";
import { Link } from "react-router-dom";


const Moviefav = () => {
  const allItems = JSON.parse(localStorage.getItem("arrObject"));

  return (
    <div className="movieTvFav">
      <h2>Movie Favorites!</h2>
      <div>
        {allItems !== null ? allItems.map((item) => {
          return (
            <div className="results" key={item.id}>
              <Link to={`/MoviePage/${item.id}`} className="linkName">
                <img
                  src={`https://image.tmdb.org/t/p/w92/` + item.img}
                  alt={item.id}
                />
              </Link>
              <div className="body">
                <h3>{item.name}</h3>
                <p>{item.overview}</p>
              </div>
            </div>
          );
        }) : <p style={{padding: '2%'}}>Nothing added yet. Go browse in our Movies section to add something!</p>}
      </div>
    </div>
  );
};

export default Moviefav;
