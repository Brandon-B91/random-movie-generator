import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FaStar, FaRegHeart, FaHeart, FaVest } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../App.css";

const MovieSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState();
  const [isActive, setActive] = useState();
  const [id, setId] = useState();
  const [stream, setStream] = useState();
  const [buy, setBuy] = useState();
  const [recommend, setRecommend] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&query=${inputValue}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((response) => {
        let search = response.results;
        let id = search[0].id;
        setId(id);
        setSearch(search);
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations`
        );
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let recommend = response["recommendations"].results;
        setRecommend(recommend);
        console.log(recommend);
        let stream = response["watch/providers"].results.US.flatrate;
        setStream(stream);
        let buy = response["watch/providers"].results.US.buy;
        setBuy(buy);
      });
  };

  // const favorite = () => {
  //   const newFavoriteState = !isFavorite;
  //   setIsFavorite(newFavoriteState);
  //   if (newFavoriteState) {
  //       localStorage.setItem("name", search[0].title);
  //       localStorage.setItem(
  //         "img",
  //         search?.[0].poster_path
  //       );
  //       localStorage.setItem('id', search[0].id)
  //       setCounter(counter + 1)
  //   } 
  //   else {
  //     localStorage.clear()
  //     setCounter(counter - 1)
  //   }
  // };

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
              <Link to={`/MoviePage/${item.id}`} className="linkName">
                <img
                src={
                  `https://image.tmdb.org/t/p/w500/` + item?.poster_path
                }
                alt="No Image available"
              />
              <hr />
              <h2>{item?.title}</h2>
              </Link>
              {/* <button onClick={favorite} className="favorite">
                Favorite: {isFavorite ? <FaHeart /> : <FaRegHeart />}{" "}
              </button> */}
              <ul className="top">
                <li className="li1">
                  {" "}
                  <cite>Release Date: {item?.release_date}</cite>
                </li>
                <li className="li2">
                  {" "}
                  <cite className="rating">
                    Rating: <FaStar />{" "}
                    {Math.round(item?.vote_average * 10)}%
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
      <div className="recommended">
        <Swiper pagination={true} modules={[Pagination]}>
          {recommend
            ?.filter((items, idx) => idx < 5)
            .map((item) => {
              return (
                <SwiperSlide style={{ paddingBottom: "5%", paddingTop: "10%" }}>
                  <h3 style={{ textAlign: "center", marginBottom: "5%" }}>
                    If you like {search?.[0].title} then you might like this!
                  </h3>
                  <div className="card" style={{minHeight: '650px'}}>
                  <Link to={`/MoviePage/${item.id}`} className="linkName">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w500/` + item?.poster_path
                      }
                      alt="movie poster"
                    />
                    <h2>{item.title}</h2>
                    </Link>
                    <ul className="top" style={{marginTop: 'auto'}}>
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
                    </ul>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSearch;
