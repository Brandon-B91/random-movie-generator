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
        setResponse(response)
      });
  }, []);

  let obj = {};

  response?.results.map((item) => {
    if(item.id == props.id){
      return obj = JSON.stringify(item)
    } else {
       return null
    }
  })
  

  console.log(obj)
  console.log(JSON.parse(obj))
  const obj1 = JSON.parse(obj)
  // console.log(props.item)
  // console.log(props.id)

  let page;
  let width = window.innerWidth;

  {
    obj1.media_type == "movie"
      ? (page = "MoviePage")
      : (page = "TvPage");
  }

  function removeItem() {
    localStorage.removeItem(
      obj1.title || obj1.name
    );
    window.location.reload();
  }

  return (
    <div className="results" key={obj1.id}>
      {
        <Link to={`/${page}/${obj1.id}`} className="linkName">
          <img
            src={
              `https://image.tmdb.org/t/p/w154/` +
              obj1.poster_path
            }
            alt={obj1.id}
          />
        </Link>
      }
      <div className="icon">
        {obj1.media_type == "tv" ? "TV" : "Movie"}
      </div>
      <div className="results-body">
        <h3>{obj1.title || obj1.name}</h3>
        <p>
          {window.innerWidth < 600
            ? obj1.overview.slice(0, 150)
            : obj1.overview.slice(0, 450)}
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
