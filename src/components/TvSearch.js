import React, { useState } from "react";
import { FaStar} from "react-icons/fa";
import "../App.css";

const TvSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState();
  const [isActive, setActive] = useState();
  const [id, setId] = useState();
  const [network, setNetwork] = useState();
  const [season, setSeasons] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(true);
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&query=${inputValue}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((response) => {
        let search = response.results;
        let id = search[0].id;
        setId(id);
        setSearch(search);
        console.log(search);
        return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US`
        );
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let network = response.networks;
        let season = response.seasons.length;
        setNetwork(network);
        setSeasons(season);
      });
  };

  return (
    <div className="movieContainer">
      <form onSubmit={handleSubmit} className="searchStyle">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="searchbar"
          placeholder="Search by movie name..."
        />
        <button>Search!</button>
      </form>
      {search
        ?.filter((items, idx) => idx < 1)
        .map((item) => {
          return (
            <div className="card">
              <img
                src={
                  `https://image.tmdb.org/t/p/original/` +
                  search?.[0].poster_path
                }
                alt="movie poster"
              />
              <hr />
              <h2>{search?.[0].title}</h2>
              <ul className="top">
                <li className="li1">
                  {" "}
                  <cite>Release Date: {search?.[0].first_air_date}</cite>
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
                  {network?.length > 0
                    ? network?.map((item) => {
                        return (
                          <li key={item.id} className="badge">
                            {item.name}
                          </li>
                        );
                      })
                    : "No streaming options available"}
                  <cite
                    style={{
                      marginTop: "5%",
                      marginLeft: "auto",
                      color: "white",
                    }}
                  >
                    Powered by JustWatch
                  </cite>
                </ul>
              </div>
              <div className="whereToBuy">
                <h4>Seasons</h4>
                <p>{season}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TvSearch;
