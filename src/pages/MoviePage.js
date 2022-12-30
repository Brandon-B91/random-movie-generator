import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import {
  FaLongArrowAltLeft,
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaSms,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import photo from "../images/photo.png";
import MovieImage from "../components/MovieImage";
import MovieBackdrop from "../components/MovieBackdrop";

const MoviePage = () => {
  const [res, setRes] = useState();
  const { id } = useParams();
  const params = useParams();
  const [stream, setStream] = useState();
  const [buy, setBuy] = useState();
  const [name, setName] = useState();
  const [actorId, setActorId] = useState();
  const [recommend, setRecommend] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [total, setTotal] = useState();
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFavorite(false);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations,credits`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const res = response;
        setRes(res);
        let name = response.credits.cast;
        setName(name);
        let actorId = response.credits.cast
          .filter((items, idx) => idx < 3)
          .map((item) => {
            return item.id;
          });
        setActorId(actorId);
        let stream = response["watch/providers"].results.US.flatrate;
        setStream(stream);
        let buy = response["watch/providers"].results.US.buy;
        setBuy(buy);
        let recommend = response["recommendations"].results;
        setRecommend(recommend);
        let total = response["recommendations"].total_results;
        setTotal(total);
        let data = JSON.parse(localStorage.getItem("arrObject"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === res.title) {
            setIsFavorite(!isFavorite);
          }
        }
      });
  }, [params.id]);

  const favorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (newFavoriteState) {
      let arrObject = [];
      if (
        localStorage.getItem("arrObject") &&
        localStorage.getItem("arrObject").length > 0
      )
        arrObject = JSON.parse(localStorage.getItem("arrObject"));
      let arrObj = {
        name: res.title,
        id: res.id,
        img: res.poster_path,
        overview: res.overview,
      };
      arrObject.push(arrObj);
      localStorage.setItem("arrObject", JSON.stringify(arrObject));
    }
    //  else if (!newFavoriteState) {
    //     let removeData = JSON.parse(localStorage.getItem('arrObject'))
    //     for(let i = 0; i < removeData.length; i++){
    //     if(data[i].name === res.title) {
    //       localStorage.removeItem()
    //     }
    //   }
    // }
  };

  const rating = () => {
    return Math.round(res?.vote_average * 10);
  };

  const navigate = useNavigate();

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
            baseUrl={"https://image.tmdb.org/t/p/w780/"}
            className={"main-img"}
          />
          <div className="left">
            <MovieImage
              item={res}
              baseUrl={"https://image.tmdb.org/t/p/w780/"}
            />
          </div>
          <div className="right">
            <h2>
              {res?.title}
              {res?.tagline !== null ? "" : ` - ${res?.tagline}`}
            </h2>
            <ul className="details">
              <li>
                {" "}
                <cite>Release Date: {res?.release_date}</cite>
              </li>
              <li>
                {" "}
                <cite className="rating">
                  Rating: {rating()}%
                  {rating() > 70 ? <FaStar /> : <FaRegStar />}
                </cite>
              </li>
            </ul>
            <ul className="social-ul">
              <li>
                {" "}
                <cite className="length">Length: {res?.runtime} Minutes</cite>
              </li>
              <li>
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
                color: "#121212",
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
                color: "#121212",
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
                  <>
                    <SwiperSlide>
                      <div className="recommended-card" id={item.id}>
                        <Link to={`/MoviePage/${item.id}`} className="linkName">
                          <MovieImage
                            item={item}
                            className={""}
                            baseUrl={"https://image.tmdb.org/t/p/w780/"}
                          />
                        </Link>
                        <p>{item.overview}</p>
                        <div className="card-bottom">
                          <ul>
                            <li>
                              <cite>Release Date: {res?.release_date}</cite>
                            </li>
                            <li>
                              <cite>
                                Rating: {Math.round(item?.vote_average * 10)}%
                              </cite>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                  </>
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
