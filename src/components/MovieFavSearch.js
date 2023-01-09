import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MovieFavSearch = (props) => {
  const [res, setRes] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    const auto = fetch(`
        https://api.themoviedb.org/3/search/multi?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&query=${props.item}&page=1&include_adult=false`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResponse(response);
      });
  }, []);

  console.log(Object.entries(localStorage))

  let page;

  let width = window.innerWidth;

  {
    response?.results[0].media_type == "movie"
      ? (page = "MoviePage")
      : (page = "TvPage");
  }

  function removeItem() {
    localStorage.removeItem(
      response?.results[0].title || response?.results[0].name
    );
    window.location.reload();
  }

  return (
    <div className="results" key={response?.results[0].id}>
      {
        <Link to={`/${page}/${response?.results[0].id}`} className="linkName">
          <img
            src={
              `https://image.tmdb.org/t/p/w154/` +
              response?.results[0].poster_path
            }
            alt={response?.results[0].id}
          />
        </Link>
      }
      <div className="icon">{response?.results[0].media_type == "tv" ? "TV" : "Movie" }</div>
      <div className="results-body">
        <h3>{response?.results[0].title || response?.results[0].name}</h3>
        <p>
          {window.innerWidth < 600
            ? response?.results[0].overview.slice(0, 150)
            : response?.results[0].overview.slice(0, 450)}
          ...
        </p>
      </div>
      <button onClick={removeItem}>X</button>
    </div>
  );
};

export default MovieFavSearch;
