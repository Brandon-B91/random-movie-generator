import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

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
        {search?.slice(0, 10).map((item) => {
          return (
            <SwiperSlide>
              <div className="card">
                <Link to={`/TvPage/${item.id}`} className="linkName">
                  <img
                    src={
                      `https://image.tmdb.org/t/p/original/` + item?.poster_path
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

export default TvSearch;
