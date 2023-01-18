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
        let res = response.results[0]
        setRes(res)
      });
  }, []);

  let page;
  let width = window.innerWidth;

  {
    res?.media_type == "movie" ? (page = "MoviePage") : (page = "TvPage");
  }

  function removeItem() {
    localStorage.removeItem(res?.title || res?.name);
    window.location.reload();
  }

  return (
    <div className="results" key={res?.id}>
      {
        <Link to={`/${page}/${res?.id}`} className="linkName">
          <img
            src={`https://image.tmdb.org/t/p/w154/` + res?.poster_path}
            alt={res?.id}
          />
        </Link>
      }
      <div className="icon">{res?.media_type == "tv" ? "TV" : "Movie"}</div>
      <div className="results-body">
        <h3>{res?.title || res?.name}</h3>
        <p>
          {window.innerWidth < 600
            ? res?.overview.slice(0, 150)
            : res?.overview.slice(0, 450)}
          ...
        </p>
      </div>
      <button className="results-button" onClick={removeItem}>
        X
      </button>
    </div>
  );
};

export default MovieFavSearch;
