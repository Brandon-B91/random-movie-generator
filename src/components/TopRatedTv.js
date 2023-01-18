import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieImage from "./MovieImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const TopRatedTv = () => {
  const [res, setRes] = useState();

  useEffect(() => {
    const id = localStorage.getItem("searchItem");
    const auto = fetch(`
        https://api.themoviedb.org/3/tv/top_rated?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&page=1`)
      .then((response) => response.json())
      .then((response) => {
        let res = response;
        setRes(res);
        console.log(res);
      });
  }, []);

  return (
    <div className="top-rated">
      <h4>Why not check out these top rated movies!</h4>
      <Swiper
        slidesPerView={2}
        spaceBetween={5}
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
        {res?.results.slice(0, 10).map((item) => {
          return (
            <SwiperSlide>
              <div className="card" key={item.id}>
                <Link to={`/TvPage/${item.id}`} className="linkName">
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

export default TopRatedTv;
