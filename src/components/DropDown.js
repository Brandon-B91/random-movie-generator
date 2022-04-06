import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const DropDown = () => {
  const [value, setValue] = useState();
  const [data, setData] = useState();
  const [random, setRandom] = useState();
  const [currentResult, setCurrentResult] = useState(null);
  const [id, setId] = useState();
  const [stream, setStream] = useState();
  const [buy, setBuy] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    const discover = fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&sort_by=popularity.desc&include_adult=false&page=${random}&include_video=false&with_genres=${value}&with_watch_monetization_types=flatrate`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
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
      })
      .then((response) => response.json())
      .then((response) => {
        let stream = response.results.US.flatrate;
        let buy = response.results.US.buy;
        console.log(stream);
        console.log(buy);
        console.log(response.results);
        setStream(stream);
        setBuy(buy)
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
        <button onClick={handleClick}>Search!</button>
      </div>
      {currentResult && (
        <div className="card">
          <img
            src={
              `https://image.tmdb.org/t/p/w500/` +
              data?.results?.[currentResult].poster_path
            }
            alt="movie poster"
          />
          <hr />
          <h2>{data?.results?.[currentResult].title}</h2>
          <ul className="top">
            <li className="li1">
              {" "}
              <cite>
                Release Date: {data?.results?.[currentResult].release_date}
              </cite>
            </li>
            <li className="li2">
              {" "}
              <cite className="rating">
                Rating: <FaStar />{" "}
                {Math.round(data?.results?.[currentResult].vote_average)}/10
              </cite>
            </li>
          </ul>
          <h3>Overview</h3>
          <p>{data?.results?.[currentResult].overview}</p>
          <div className="whereToWatch">
            <h4>Where to Stream...</h4>
            <ul className="whereToWatchList">
              {stream?.length > 0
                ? stream?.map(item => {
                    return (
                      <li key={item.provider_id} className="badge">
                        {item.provider_name}
                      </li>
                    );
                  })
                : "No streams available"}
            </ul>
          </div>
          <div className="whereToBuy">
          <h4>Where to buy...</h4>
            <ul className="whereToBuyList">
              {buy?.length > 0 ?
                buy?.map(item => {
                return (
                  <li key={item.provider_id} className="badge">
                    {item.provider_name}
                  </li>
                );
              }): "No purchase options available"}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
