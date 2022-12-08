import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        setValue(value);
      });
  }, []);

  return (
    <div className="trendingList" key={id}>
      <h1>Top in Movies Today!</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        freeMode={true}
        // pagination={{
        //   clickable: true,
        //   centered: true,
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
                  <Link to={`/MoviePage/${item.id}`} className="linkName">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/w500/` + item?.poster_path
                      }
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

export default AutoLoad;
