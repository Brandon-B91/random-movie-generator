import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import MovieBackdrop from "../components/MovieBackdrop";
import MovieImage from "../components/MovieImage";
import {
  FaLongArrowAltLeft,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaSms,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const MoviePage = () => {
  const [res, setRes] = useState();
  const { id } = useParams();
  const params = useParams();
  const [stream, setStream] = useState();
  const [buy, setBuy] = useState();
  const [recommend, setRecommend] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [total, setTotal] = useState();
  const [name, setName] = useState();
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFavorite(false);
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations,credits`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const res = response;
        setRes(res);
        let name = response.credits.cast;
        setName(name);
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

  const animate = () => {
    setBounce(true);

    setTimeout(() => setBounce(false), 1000);
  };

  return (
    <>
      <div className="moviePage">
        <div className="main">
          <div className="top-nav">
            <button onClick={() => navigate(-1)} className="back">
              <FaLongArrowAltLeft className="back-arrow" />
            </button>
            <button
              onClick={() => {
                favorite();
                animate();
              }}
              className={bounce ? "bounce" : "favorite"}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}{" "}
            </button>
          </div>
          <MovieBackdrop
            item={res}
            baseUrl={"https://image.tmdb.org/t/p/w500/"}
            className="main-img"
          />
          <div className="left">
            <MovieImage
              item={res}
              baseUrl={"https://image.tmdb.org/t/p/w780/"}
            />
          </div>
          <div className="right">
            <h2>
              {res?.name}
              {res?.tagline == "" ? "" : ` - ${res?.tagline}`}
            </h2>
            <ul className="details">
              <li>
                <cite>First air date: {res?.first_air_date == "" ? "TBD:" : res?.first_air_date }</cite>
              </li>
              <li>
              <cite className="rating">
                  Rating: {rating()}%
                  {rating() > 70 ? <FaStar /> : <FaRegStar />}
                </cite>
              </li>
            </ul>
            <ul className="social-ul">
              <li>
                {" "}
                <cite>
                  Length: {res?.episode_run_time[0]} Minutes per episode
                </cite>
              </li>
              <li>
                {" "}
                <a
                  href={
                    "sms:?&body=You need to watch this! " + window.location.href
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialShare"
                >
                  <FaSms />
                </a>
              </li>
            </ul>

            <ul>
              <li>Seasons: {res?.number_of_seasons}</li>
              <li>Episodes: {res?.number_of_episodes}</li>
            </ul>
            <h3>Overview</h3>
            <p>{res?.overview}</p>
            <ul className="name-badge-list">
              {name?.slice(0, 3).map((item) => {
                return (
                  <Link
                    to={`/ActorPage/${item.id}`}
                    className="linkName"
                    key={item.id}
                  >
                    <li className="name-badge">{item.name}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
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
        </div>
        <div className="recommended">
          {total > 0 ? (
            <h3>If you like {res?.title} then you might like this!</h3>
          ) : (
            ""
          )}
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
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            modules={[FreeMode, Pagination]}
          >
            {recommend
              ?.slice(0, 10)
              .map((item) => {
                return (
                  <SwiperSlide>
                    <div className="recommended-card">
                      <Link to={`/TvPage/${item.id}`} className="linkName">
                        <MovieImage item={item} baseUrl={"https://image.tmdb.org/t/p/w780/"} />
                        <h3>{item.name}</h3>
                      </Link>
                      <p>{item.overview}</p>
                      <div className="card-bottom">
                        <ul>
                          <li>
                            <cite>First air date: {res?.first_air_date}</cite>
                          </li>
                          <li>
                            <cite>
                              Rating: <FaStar />
                              {Math.round(res?.vote_average * 10)}%
                            </cite>
                          </li>
                        </ul>
                      </div>
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
