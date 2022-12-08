import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

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
      <h1>Top in TV Today!</h1>
      <Swiper
         slidesPerView={2}
         spaceBetween={5}
        freeMode={true}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[FreeMode, Pagination]}
      >
      {trending
        ?.filter((items, idx) => idx < 10)
        .map((item) => {
          return (
            <SwiperSlide>
            <div className="card">
              <Link to={`/TvPage/${item.id}`} className="linkName">
                <img
                  src={`https://image.tmdb.org/t/p/w500/` + item.poster_path}
                  alt="movie poster"
                />
              </Link>
            </div>
            </SwiperSlide>
          );
        })}
        </Swiper>
    </div>
  );
};

export default AutoLoadTv;
