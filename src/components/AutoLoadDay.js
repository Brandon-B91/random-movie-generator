import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { FaStar } from "react-icons/fa";

const AutoLoad = (props) => {
  const [trending, setTrending] = useState();
  const [id, setId] = useState();
  const [stream, setStream] = useState();
  const [buy, setBuy] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    const auto = fetch(`
        https://api.themoviedb.org/3/trending/movie/day?api_key=f79df266a37e366257a09e6b64a14de9`)
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
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=f79df266a37e366257a09e6b64a14de9`
        );
      })
      .then((response) => response.json())
      .then((response) => {
        let stream = response.results.US.flatrate;
        let buy = response.results.US.buy;
        setStream(stream);
        setBuy(buy);
        setValue(value);
      });
  }, []);

  return (
    <div className="trendingList" key={id}>
      <h1>Top in Movies Today!</h1>
      {trending
        ?.filter((items, idx) => idx < 5)
        .map((item) => {
          return (
      <div className="card">
        <Link to={`/MoviePage/${item.id}`} className="linkName">
        <img
          src={`https://image.tmdb.org/t/p/w500/` + item?.poster_path}
          alt="movie poster"
        />
        <hr />
        <h2>{item?.title}</h2>
        </Link>
        <ul className="top">
          <li className="li1">
            {" "}
            <cite>Release Date: {item?.release_date}</cite>
          </li>
          <li className="li2">
            {" "}
            <cite className="rating">
              Rating: <FaStar /> {Math.round(item?.vote_average * 10)}%
            </cite>
          </li>
        </ul>
        <h3>Overview</h3>
        <p>{item?.overview}</p>
        {/* <div className="whereToWatch">
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
              : "No streaming options available / In theatres"}
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
        </div> */}
      </div>
      );
        })} 
    </div>
  );
};

export default AutoLoad;
