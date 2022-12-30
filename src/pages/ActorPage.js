import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import MovieImage from "../components/ MovieImage";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import photo from "../images/photo.png";

const ActorPage = () => {
  const { id } = useParams();
  const params = useParams();
  const [res, setRes] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=movie_credits,tv_credits,popular,latest`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let res = response;
        setRes(res);
      });
  }, [params.id]);

  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="top-nav">
          <button onClick={() => navigate(-1)} className="back">
            <FaLongArrowAltLeft className="back-arrow" />
          </button>
        </div>
        <div className="actor-main">
          <img
            src={
              `https://image.tmdb.org/t/p/w780/` +
              res?.movie_credits.cast[0].poster_path
            }
            alt=""
            className="actor-main-img"
          />
          <div className="actor-left">
            <img
              src={ res?.profile_path == null ? photo :`https://image.tmdb.org/t/p/w500/` + res?.profile_path}
              alt="movie poster"
              className="actor-img"
            />
            <h2>{res?.name}</h2>
            <h4>Personal Info</h4>
            <ul>
              <li>Birthday: {res?.birthday ? res?.birthday : "Unknown"}</li>
              <li>Gender: {res?.gender == 1 ? "Female" : "Male"}</li>
              <li>
                Born: {res?.place_of_birth ? res?.place_of_birth : "Unknown"}
              </li>
              <li>Known for: {res?.known_for_department}</li>
            </ul>
          </div>
          <div className="actor-right">
            <h4>Biography</h4>
            <p>
              {res?.biography
                ? res?.biography
                : "Not much is know of this person oh, what am mystery they are!"}
            </p>
          </div>
        </div>
        <div className="actor-body">
          <h4>Movies {res?.name} has starred in!</h4>
          <Swiper
            slidesPerView={1}
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
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[FreeMode, Pagination]}
          >
            {res?.movie_credits.cast.slice(0, 10).map((item) => {
              return (
                <SwiperSlide>
                  <div key={item.id}>
                    <Link to={`/MoviePage/${item.id}`} className="linkName">
                      <MovieImage item={item} />
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <h4>Tv shows {res?.name} has starred in!</h4>

          <Swiper
            slidesPerView={1}
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
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[FreeMode, Pagination]}
          >
            {res?.tv_credits.cast.slice(0, 10).map((item) => {
              return (
                <SwiperSlide>
                  <div key={item.id}>
                    <Link to={`/TvPage/${item.id}`} className="linkName">
                      <MovieImage item={item} />
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="actor-bottom">
          <div className="actor-bottom-left">
            <h4>Full list of movies {res?.name} has starred in!</h4>
            {res?.movie_credits.cast.map((item) => {
              return (
                <Link to={`/MoviePage/${item.id}`}>
                  <div className="movie-list">
                    <ul>
                      <li>{item.release_date}</li>
                      <li>{item.title}</li>
                      <li>{Math.round(item.vote_average * 10)}%</li>
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="actor-bottom-right">
            <h4>Full list of tv shows {res?.name} has starred in!</h4>
            {res?.tv_credits.cast.map((item) => {
              return (
                <Link to={`/TvPage/${item.id}`} key={item.id}>
                  <div className="movie-list">
                    <ul>
                      <li>{item.first_air_date}</li>
                      <li>{item.name}</li>
                      <li>{Math.round(item.vote_average * 10)}%</li>
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default ActorPage;
