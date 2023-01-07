import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import MovieBackdrop from "../components/MovieBackdrop";
import MovieImage from "../components/MovieImage";
import TopNavTv from "../components/TopNavTv";
import { FaStar, FaRegStar, FaSms } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const MoviePage = (props) => {
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
  const [title, setTitle] = useState();
  const [review, setReview] = useState();
  const [isActive, setIsActive] = useState(null);
  const [genre, setGenre] = useState()

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFavorite(false);
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations,credits,reviews`
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
        let review = response.reviews;
        setReview(review);
        let recommend = response["recommendations"].results;
        setRecommend(recommend);
        let title = response.name
        setTitle(title)
        let genre = response.genres
        setGenre(genre)
      });
  }, [params.id]);

  const navigate = useNavigate();

  const rating = () => {
    return Math.round(res?.vote_average * 10);
  };

  const animate = () => {
    setBounce(true);

    setTimeout(() => setBounce(false), 1000);
  };

  const handleClick = (e, ids) => {
    if (isActive === ids) {
      setIsActive(null)
    } else {
      setIsActive(ids)
    }
  }

  return (
    <>
      <div className="moviePage">
        <div className="main">
          <TopNavTv res={res} id={id} name={title} />
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
                <cite>
                  First air date:{" "}
                  {res?.first_air_date == "" ? "TBD:" : res?.first_air_date}
                </cite>
              </li>
              <li>
                <cite className="rating">
                  Rating: {rating()}%
                  {rating() >= 70 ? <FaStar /> : <FaRegStar />}
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
            <ul>
              {genre?.slice(0 ,3).map((item) => {
                return(
                <li className="badge">{item.name}</li>
                )
              })}
            </ul>
            <p>{res?.overview == "" ? "No overview available..." : res?.overview}</p>
            <h3>Cast</h3>
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
        <h4>Reviews!</h4>
        {review?.total_results > 0
          ? review?.slice(0, 3).map((item) => {
              return (
                <div className="review" key={item.id} onClick={(e) => handleClick(e, item.id)} >
                  <div className="review-head">
                    <div className="review-head-left">
                      {isActive === item.id? <span>-</span> : <span>+</span>}
                    </div>
                    <div className="review-head-right">
                      {item.author} <br />
                    </div>
                  </div>
                  <div className={isActive === item.id ? 'review-body-open' : 'review-body'}>{item.content}</div>
                </div>
              );
            })
          : "Looks like there aren't any reviews!"}
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
            {recommend?.slice(0, 10).map((item) => {
              return (
                <SwiperSlide>
                  <div className="recommended-card">
                    <Link to={`/TvPage/${item.id}`} className="linkName">
                      <MovieImage
                        item={item}
                        baseUrl={"https://image.tmdb.org/t/p/w780/"}
                      />
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
