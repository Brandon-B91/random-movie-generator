import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegHeart, FaHeart, FaSearch, FaVest } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
const MovieSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState();
  const [isActive, setActive] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [actorId, setActorId] = useState();
  const [recommend, setRecommend] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&query=${inputValue}&page=1&include_adult=false`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
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

      });
  };

  return (
    <div className="movieContainer">
      <div className="searchStyle">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="searchBar"
            placeholder="Search by movie name..."
          />
          <button>
            <FaSearch />
          </button>
        </form>
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        freeMode={true}
        centeredSlides={true}
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
      {search
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
                      alt="No Image available"
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

export default MovieSearch;
