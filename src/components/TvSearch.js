import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../App.css";

const TvSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState();
  const [isActive, setActive] = useState();
  const [id, setId] = useState();
  const [network, setNetwork] = useState();
  const [season, setSeasons] = useState();
  const [recommend, setRecommend] = useState();

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

        return fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders%2Crecommendations`
        );
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let recommend = response["recommendations"].results;
        setRecommend(recommend);
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
        ?.filter((items, idx) => idx < 5)
        .map((item) => {
          return (
            <div className="card">
              <Link to={`/TvPage/${item.id}`} className="linkName">
                <img
                  src={
                    `https://image.tmdb.org/t/p/original/` + item?.poster_path
                  }
                  alt="movie poster"
                />
                <hr />
                <h2>{item?.name}</h2>
              </Link>
              <ul className="top">
                <li className="li1">
                  {" "}
                  <cite>Release Date: {item?.first_air_date}</cite>
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
              </div> */}
            </div>
          );
        })}
      <div className="recommended">
        <Swiper pagination={true} modules={[Pagination]}>
          {recommend
            ?.filter((items, idx) => idx < 5)
            .map((item) => {
              return (
                <SwiperSlide style={{ paddingBottom: "5%" }}>
                  <h3 style={{ textAlign: "center", marginBottom: "5%" }}>
                    If you like {search?.[0].name} then you might want to check
                    out this!
                  </h3>
                  <div className="card" style={{ minHeight: "550px" }}>
                    <Link to={`/TvPage/${item.id}`} className="linkName">
                      <img
                        src={
                          `https://image.tmdb.org/t/p/w500/` + item?.poster_path
                        }
                        alt="movie poster"
                      />
                      <h2>{item.name}</h2>
                    </Link>
                    <ul className="top" style={{ marginTop: "auto" }}>
                      <li className="li1">
                        {" "}
                        <cite>Release Date: {search?.[0].release_date}</cite>
                      </li>
                      <li className="li2">
                        {" "}
                        <cite className="rating">
                          Rating: <FaStar />{" "}
                          {Math.round(search?.[0].vote_average * 10)}%
                        </cite>
                      </li>
                    </ul>                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default TvSearch;
