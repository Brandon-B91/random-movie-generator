import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieImage from "./MovieImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const AutoLoad = (props) => {
  const [trending, setTrending] = useState();
  const [id, setId] = useState();

  const [value, setValue] = useState();

  useEffect(() => {
    const auto = fetch(`
        https://api.themoviedb.org/3/trending/movie/week?api_key=f79df266a37e366257a09e6b64a14de9`)
      .then((response) => response.json())
      .then((response) => {
        let trending = response.results;
        let id = response.results.slice(0, 5).map((item) => {
          return item.id;
        });
        setId(id);
        setTrending(trending);
        console.log(trending);
        return fetch(`
        https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=f79df266a37e366257a09e6b64a14de9`);
      })
      .then((response) => response.json())
      .then((response) => {});
  }, []);

  return (
    <div className="trendingList" key={id}>
      <h1>Top in Movies This Week!</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[FreeMode, Pagination]}
      >
        {trending?.slice(0, 10).map((item) => {
          return (
            <SwiperSlide>
              <div className="card" key={item.id}>
                <Link to={`/MoviePage/${item.id}`} className="linkName">
                  <MovieImage
                    item={item}
                    baseUrl={"https://image.tmdb.org/t/p/w500/"}
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

export default AutoLoad;
