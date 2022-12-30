import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaSearch } from "react-icons/fa";

const DropDown = () => {
  const [value, setValue] = useState();
  const [data, setData] = useState();
  const [random, setRandom] = useState();
  const [currentResult, setCurrentResult] = useState(null);
  const [id, setId] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    const discover = fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&sort_by=popularity.desc&include_adult=false&page=${random}&include_video=false&with_genres=${value}&with_watch_monetization_types=flatrate`
    )
      .then((response) => response.json())
      .then((response) => {
        let data = response;
        setData(data);
        let random = Math.floor(Math.random() * 500);
        setRandom(random);
        let currentResult = Math.floor(Math.random() * data.results.length);
        setCurrentResult(currentResult);
        let id = data.results[currentResult].id;
        setId(id);
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=f79df266a37e366257a09e6b64a14de9&regions-us`
        );
      });
  };

  return (
    <div className="container">
      <div className="dropDownStyle">
        <select name="selectList" id="selectList" onChange={handleChange}>
          <option value="28">Action</option> 
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
        <button onClick={handleClick}>Search</button>
      </div>
      {currentResult && (
        <div className="discover-card">
          <div className="card">
            <Link to={`/MoviePage/${id}`} className="linkName">
              <img
                src={
                  `https://image.tmdb.org/t/p/original/` +
                  data?.results?.[currentResult].poster_path  
                }
                alt="movie poster"
              />
              <h2>{data?.results?.[currentResult].title}</h2>
            </Link>
            <h3>Overview</h3>
            <p>{data?.results?.[currentResult].overview}</p>
            <div className="card-bottom">
              <ul>
                <li>
                  {" "}
                  <cite>
                    Release Date: {data?.results?.[currentResult].release_date}
                  </cite>
                </li>
                <li>
                  {" "}
                  <cite className="rating">
                    Rating: <FaStar />{" "}
                    {Math.round(data?.results?.[currentResult].vote_average) *
                      10}
                    %
                  </cite>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
