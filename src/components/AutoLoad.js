import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const AutoLoad = () => {
  const [trending, setTrending] = useState();

  useEffect(() => {
    fetch(`
        https://api.themoviedb.org/3/trending/movie/week?api_key=f79df266a37e366257a09e6b64a14de9`)
      .then((response) => response.json())
      .then((response) => {
        let trending = response.results;
        setTrending(trending);
        console.log(trending);
      });
  }, []);

  return (
    <div className="trendingList">
      <h1>Trending this week!</h1>
        {trending?.splice(0, 5).map((item) => {
          return (
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500/` + item.poster_path}
                alt=""
              />
              <hr />
              <h2>{item.title}</h2>
              <ul className="top">
                <li className="li1">
                  {" "}
                  <cite>Release Date: {item.release_date}</cite>
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
            </div>
          );
        })}
    </div>
  );
};

export default AutoLoad;
