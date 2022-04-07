import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const AutoLoad = () => {
  const [trending, setTrending] = useState();
  const [id, setId] = useState();
  const [stream, setStream] = useState();
  const [buy, setBuy] = useState();

  useEffect(() => {
    fetch(`
        https://api.themoviedb.org/3/trending/movie/week?api_key=f79df266a37e366257a09e6b64a14de9`)
      .then((response) => response.json())
      .then((response) => {
        let trending = response.results;
        setTrending(trending);
        console.log(trending);
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
        setBuy(buy);
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
            : "No streams available"}
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

export default AutoLoad;
