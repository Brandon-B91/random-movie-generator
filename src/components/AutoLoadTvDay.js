import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const AutoLoadTv = () => {
  const [trending, setTrending] = useState();
  const [id, setId] = useState();
  const [season, setSeasons] = useState();
  const [network, setNetwork] = useState();

  useEffect(() => {
    const auto = fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=f79df266a37e366257a09e6b64a14de9`
    )
      .then((response) => response.json())
      .then((response) => {
        let trending = response.results;
        let id = response.results
          .filter((items, idx) => idx < 5)
          .map((item) => {
            return item.id;
          });
        setId(id);
        setTrending(trending);
        console.log(trending);
        return fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US`
        );
      })
      .then((response) => response.json())
      .then((response) => {
        let network = response.networks;
        let season = response.seasons.length;
        setNetwork(network);
        setSeasons(season);
      });
  }, []);

  return (
    <div className="trendingList">
      <h1>Top in TV Today</h1>
      {trending
        ?.filter((items, idx) => idx < 1)
        .map((item) => {
          return (
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500/` + item.poster_path}
                alt="movie poster"
              />
              <hr />
              <h2>{item.title}</h2>
              <ul className="top">
                <li className="li1">
                  {" "}
                  <cite>Release Date: {item.first_air_date}</cite>
                </li>
                <li className="li2">
                  {" "}
                  <cite className="rating">
                    Rating: <FaStar /> {Math.round(item.vote_average)}/10
                  </cite>
                </li>
              </ul>
              <h3>Overview</h3>
              <p>{item.overview}</p>
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

export default AutoLoadTv;
