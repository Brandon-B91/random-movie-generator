import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import {
  FaLongArrowAltLeft,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaSms,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../App.css";

const MoviePage = () => {
  const [res, setRes] = useState();
  const { id } = useParams();
  const params = useParams();
  const [stream, setStream] = useState();
  const [buy, setBuy] = useState();
  const [recommend, setRecommend] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [total, setTotal] = useState();


  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFavorite(false);
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const res = response;
        setRes(res);
        let stream = response["watch/providers"].results.US.flatrate;
        setStream(stream);
        let buy = response["watch/providers"].results.US.buy;
        setBuy(buy);
        let recommend = response["recommendations"].results;
        setRecommend(recommend);
        let data = JSON.parse(localStorage.getItem("arrObjectTv"));
        for (let i = 0; i < data.length; i++) {
          setTimeout(() => {
            if (data[i].name === res.name) {
              setIsFavorite(!isFavorite);
            }
          }, 200);
        }
      });
  }, [params.id]);

  const favorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (newFavoriteState) {
      let arrObjectTv = [];
      if (
        localStorage.getItem("arrObjectTv") &&
        localStorage.getItem("arrObjectTv").length > 0
      )
        arrObjectTv = JSON.parse(localStorage.getItem("arrObjectTv"));
      let arrObj = {
        name: res.name,
        id: res.id,
        img: res.poster_path,
        overview: res.overview,
        media: "tv",
      };
      arrObjectTv.push(arrObj);
      localStorage.setItem("arrObjectTv", JSON.stringify(arrObjectTv));
    } else {
      // localStorage.clear()
    }
  };

  const navigate = useNavigate();

  const rating = () => {
    return Math.round(res?.vote_average * 10);
  };

  return (
    <>
      <div className="moviePage">
        <button onClick={() => navigate(-1)} className="back">
          <FaLongArrowAltLeft className="back-arrow" />
        </button>
        <button onClick={favorite} className="favorite">
          {isFavorite ? <FaHeart /> : <FaRegHeart />}{" "}
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500/` + res?.backdrop_path}
          alt="movie poster"
          style={{ width: "100%" }}
        />
        <h2>
          {res?.name}
          {res?.tagline !== null ? "" : ` - ${res?.tagline}`}
        </h2>
        <ul className="details">
          <li>
            <cite>Release Date: {res?.first_air_date}</cite>
          </li>
          <li>
            <cite className="rating">
              Rating: <FaStar /> {Math.round(res?.vote_average * 10)}%
            </cite>
          </li>
        </ul>
        <cite style={{ marginLeft: "2%" }}>
          Length: {res?.episode_run_time[0]} Minutes per episode
        </cite>
        <ul>
          <li>Seasons: {res?.number_of_seasons}</li>
          <li>Episodes: {res?.number_of_episodes}</li>
        </ul>
        <p>{res?.overview}</p>
        <div className="whereToWatch">
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
          <h4>Share this!</h4>
          <a
            href={"sms:?&body=You need to watch this! " + window.location.href}
            target="_blank"
            rel="noopener noreferrer"
            className="socialShare"
          >
            <FaSms />
          </a>
        </div>
        <div className="recommended">
          {total > 0 ? (
            <h3>If you like {res?.title} then you might like this!</h3>
          ) : (
            ""
          )}
          <Swiper pagination={true} modules={[Pagination]}>
            {recommend
              ?.filter((items, idx) => idx < 10)
              .map((item) => {
                return (
                  <SwiperSlide>
                    <div className="recommended-card">
                      <Link to={`/TvPage/${item.id}`} className="linkName">
                        <img
                          src={
                            `https://image.tmdb.org/t/p/w500/` +
                            item?.backdrop_path
                          }
                          alt="movie poster"
                        />
                        <h2>{item.name}</h2>
                      </Link>
                      <p>{item.overview}</p>
                      <ul>
                        <li>
                          {" "}
                          <cite>Release Date: {res?.release_date}</cite>
                        </li>
                        <li className="li2">
                          {" "}
                          <cite className="rating">
                            Rating: <FaStar />{" "}
                            {Math.round(res?.vote_average * 10)}%
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
      <Nav />
    </>
  );
};

export default MoviePage;
