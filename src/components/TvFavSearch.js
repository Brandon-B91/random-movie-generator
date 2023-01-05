import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TvFavSearch = (props) => {
  const [res, setRes] = useState();

  useEffect(() => {
    const auto = fetch(`
        https://api.themoviedb.org/3//search/multi?api_key=f79df266a37e366257a09e6b64a14de9`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return fetch(`
        https://api.themoviedb.org/3/tv/${props.id}?api_key=f79df266a37e366257a09e6b64a14de9`);
      })
      .then((response) => response.json())
      .then((response) => {
        let res = response;
        setRes(res);
        // console.log(res);
      });
  }, []);

  function removeItem() {
    localStorage.removeItem(JSON.stringify(res?.name))
    window.location.reload()
  }

  return (
    <div className="results" key={res?.id}>
      <Link to={`/TvPage/${res?.id}`} className="linkName">
        <img
          src={`https://image.tmdb.org/t/p/w92/` + res?.poster_path}
          alt={res?.id}
        />
      </Link>
      <div className="body">
        <h3>{res?.name}</h3>
        <p>{res?.overview.slice(0, 150)}...</p>
      </div>
      <button onClick={removeItem}>X</button>
    </div>
  );
};

export default TvFavSearch;
