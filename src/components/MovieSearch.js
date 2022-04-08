import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../App.css";

const MovieSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState();
  const [isActive, setActive] = useState();
  const [id, setId] = useState()
  const [stream, setStream] = useState()
  const [buy, setBuy] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&query=${inputValue}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((response) => {
        let search = response.results;
        let id = search[0].id
        setId(id)
        console.log(id)
        setSearch(search);
        console.log(search);
        return fetch(
            `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=f79df266a37e366257a09e6b64a14de9&regions-us`
          )
      })
      .then((response) => response.json())
      .then((response) => {
          let stream = response.results.US.flatrate
          setStream(stream)
          let buy = response.results.US.buy
          setBuy(buy)
          console.log(stream)
          console.log(buy)
      })
  };

  return (
    <div>
      <form onSubmit={handleSubmit} class="searchStyle">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="searchbar"
          placeholder="Search by movie name..."
        />
        <input type="submit" value="Search for movie" className="searchBtn"/>
      </form>
        {search?.filter((items, idx) => idx < 1).map((item) => {
           return (
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500/` + search?.[0].poster_path}
                alt="movie poster"
              />
              <hr />
              <h2>{search?.[0].title}</h2>
              <ul className="top">
                <li className="li1">
                  {" "}
                  <cite>Release Date: {search?.[0].release_date}</cite>
                </li>
                <li className="li2">
                  {" "}
                  <cite className="rating">
                    Rating: <FaStar /> {Math.round(search?.[0].vote_average)}
                    /10
                  </cite>
                </li>
              </ul>
              <h3>Overview</h3>
              <p>{search?.[0].overview}</p>
              <div className="whereToWatch">
                <h4>Where to Stream...</h4>
                <ul className="whereToWatchList">
                  {stream?.length > 0
                    ? stream?.map((item) => {
                        return (
                          <li key={item.provider_id} className="badge">
                            {item.provider_name}
                          </li>
                        );
                      })
                    : "No streaming options available"}
                </ul>
              </div>
              <div className="whereToBuy">
                <h4>Where to buy...</h4>
                <ul className="whereToBuyList">
                  {buy?.length > 0
                    ? buy?.map((item) => {
                        return (
                          <li key={item.provider_id} className="badge">
                            {item.provider_name}
                          </li>
                        );
                      })
                    : "No purchase options available"}
                </ul>
              </div>
            </div>
           );
        })} 
    </div>
  );
};

export default MovieSearch;
