import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const DropDownTv = (props) => {
  const [value, setValue] = useState();
  const [data, setData] = useState();
  const [random, setRandom] = useState();
  const [currentResult, setCurrentResult] = useState(null);
  const [id, setId] = useState();
  const [network, setNetwork] = useState();
  const [season, setSeasons] = useState();
  const [imgSrc, setimgSrc] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    const discovertv = fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&sort_by=popularity.desc&page=${random}&with_genres=${value}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let data = response;
        setData(data);
        let random = Math.floor(Math.random() * 100);
        setRandom(random);
        let currentResult = Math.floor(Math.random() * data.results.length);
        setCurrentResult(currentResult);
        let id = data.results[currentResult].id;
        setId(id);
        return fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US`
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            let network = response.networks;
            let season = response.seasons.length;
            console.log(network);
            setNetwork(network);
            setSeasons(season);
            let imgSrc =
              `https://image.tmdb.org/t/p/original/` +
              data?.results?.[currentResult].poster_path;
            setimgSrc(imgSrc);
          });
      });
  };

  return (
    <div className="container">
      <div className="dropDownStyle">
        <select name="selectList" id="selectList" onChange={handleChange}>
          <option value="10759">Action / Adventure</option> 
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="10762">kids</option>
          <option value="9648">Mystery</option>
          <option value="10763">News</option>
          <option value="10764">Reality</option>
          <option value="10765">Sci fi / Fantasy</option>
          <option value="10766">Soap</option>
          <option value="10767">Talk</option>
          <option value="10770">War / Politics</option>
          <option value="37">Western</option>
        </select>
        <button onClick={handleClick}>Search!</button>
      </div>
      {currentResult && (
        <div className="discover-card">
          <div className="card">
            <Link to={`/TvPage/${id}`} className="linkName">
              <img
                src={
                  imgSrc ? imgSrc : data?.results?.[currentResult].backdrop_path
                }
                alt="movie poster"
              />
              <hr />
              <h2>
                {data?.results?.[currentResult].name
                  ? data?.results?.[currentResult].name
                  : data?.results?.[currentResult].original_name}
              </h2>
            </Link>
            <h3>Overview</h3>
            <p>
              {data?.results?.[currentResult].overview
                ? data?.results?.[currentResult].overview
                : "No overview available"}
            </p>
            <div className="card-bottom">
              <ul>
                <li>
                  {" "}
                  <cite>
                    Release Date:{" "}
                    {data?.results?.[currentResult].first_air_date}
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

export default DropDownTv;
