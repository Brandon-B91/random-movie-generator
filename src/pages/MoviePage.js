import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { FaPlus, FaRegStar, FaStar, FaSms } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import MovieImage from "../components/MovieImage";
import MovieBackdrop from "../components/MovieBackdrop";
import TopNav from "../components/TopNav";
import Video from "../components/Video";

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
  const [review, setReview] = useState();
  const [title, setTitle] = useState();
  const [isActive, setIsActive] = useState(null);
  const [ids, setIds] = useState();
  const [genre, setGenre] = useState();
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFavorite(false);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations,credits,reviews,videos`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const res = response;
        setRes(res);
        let name = response.credits.cast;
        setName(name);
        let actorId = response.credits.cast.slice(0, 3).map((item) => {
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
        let review = response.reviews;
        setReview(review);
        let title = response.title;
        setTitle(title);
        let genre = response.genres;
        setGenre(genre);
      });
  }, [params.id]);

  const handleClick = (e, ids) => {
    if (isActive === ids) {
      setIsActive(null);
    } else {
      setIsActive(ids);
    }
  };

  const rating = () => {
    return Math.round(res?.vote_average * 10);
  };

  const trailer = () => {
    setRotate(!rotate);
  };

  return (
    <>
      <div className="moviePage">
        <div className="main">
          <TopNav res={res} />
          <MovieBackdrop
            item={res}
            baseUrl={"https://image.tmdb.org/t/p/w780/"}
            className={"main-img"}
          />
          <div className="left">
            <div className={rotate ? "rotate media" : "media"}>
              {!rotate ? (
                <MovieImage
                  item={res}
                  baseUrl={"https://image.tmdb.org/t/p/w780/"}
                  className="left-img"
                />
              ) : (
                <Video res={res} baseUrl={"https://www.youtube.com/embed/"} />
              )}
            </div>
            <cite onClick={trailer}>
              {!rotate ? "Show trailer" : "Hide trailer"}
            </cite>
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
                  {rating() >= 70 ? <FaStar /> : <FaRegStar />}
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
            <ul>
              {genre?.slice(0, 3).map((item) => {
                return (
                  <li className="badge" key={item.id}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
            <h3>Overview</h3>
            <p>
              {res?.overview == "" ? "No overview available..." : res?.overview}
            </p>
            <h3>Cast</h3>
            <div className="name-badge-list">
              {name?.slice(0, 3).map((item) => {
                return (
                  <Link
                    to={`/ActorPage/${item.id}`}
                    className="name-badge"
                    key={item.id}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <h4>Reviews!</h4>
        {review?.total_results > 0
          ? review?.results.slice(0, 3).map((item) => {
              return (
                <div
                  className="review"
                  key={item.id}
                  onClick={(e) => handleClick(e, item.id)}
                >
                  <div className="review-head">
                    <div className="review-head-left">
                      {isActive === item.id ? <span>-</span> : <span>+</span>}
                    </div>
                    <div className="review-head-right" key={item.id}>
                      {item.author} <br />
                    </div>
                  </div>
                  <div
                    className={
                      isActive === item.id ? "review-body-open" : "review-body"
                    }
                  >
                    {item.content}
                  </div>
                </div>
              );
            })
          : "Looks like there aren't any reviews yet!"}
        <div className="whereToWatch">
          <h4>Where to Stream...</h4>
          <ul className="whereToWatchList">
            {stream > 0
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
                color: "black",
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
                color: "black",
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
            slidesPerView={"auto"}
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
                spaceBetween: 30,
              },
            }}
            modules={[FreeMode, Pagination]}
          >
            {recommend?.slice(0, 10).map((item) => {
              return (
                <>
                  <SwiperSlide>
                    <div
                      className="recommended-card"
                      id={item.id}
                      key={item.id}
                    >
                      <Link to={`/MoviePage/${item.id}`} className="linkName">
                        <MovieImage
                          item={item}
                          className={""}
                          baseUrl={"https://image.tmdb.org/t/p/w780/"}
                        />
                      </Link>
                      <h3>{item.title}</h3>
                      <p>
                        {item.overview
                          ? item.overview
                          : "No overview available"}
                      </p>
                      <div className="card-bottom">
                        <ul>
                          <li>
                            <cite>Release Date: {res?.release_date}</cite>
                          </li>
                          <li>
                            <cite>
                              Rating: {Math.round(item?.vote_average * 10)}%{" "}
                              {Math.round(item?.vote_average * 10) >= 70 ? (
                                <FaStar />
                              ) : (
                                <FaRegStar />
                              )}
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
