import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaSms } from "react-icons/fa";
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
  const [value, setValue] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsFavorite(false);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations`
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        const res = response;
        setRes(res);
        let stream = response["watch/providers"].results.US.flatrate;
        setStream(stream);
        let buy = response["watch/providers"].results.US.buy;
        setBuy(buy);
        let recommend = response["recommendations"].results;
        setRecommend(recommend);
        let data = JSON.parse(localStorage.getItem("arrObject"));
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === res.title) {
            setIsFavorite(!isFavorite);
            // alert('hello')
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
    } else if (!newFavoriteState) {
      //   let removeData = JSON.parse(localStorage.getItem('arrObject'))
      //   for(let i = 0; i < removeData.length; i++){
      //   if(data[i].name === res.title) {
      //     localStorage.removeItem()
      //   }
      // }
    }
  };

  return (
    <>
      <Header />
      <div className="moviePage">
        <img
          src={`https://image.tmdb.org/t/p/w500/` + res?.backdrop_path}
          alt="movie poster"
          style={{ width: "100%" }}
        />
        <h2>{res?.title + ` - ` + res?.tagline}</h2>
        <button onClick={favorite} className="favorite">
          Favorite: {isFavorite ? <FaHeart /> : <FaRegHeart />}{" "}
        </button>
        <ul className="top">
          <li className="li1">
            {" "}
            <cite>Release Date: {res?.release_date}</cite>
          </li>
          <li className="li2">
            {" "}
            <cite className="rating">
              Rating: <FaStar /> {Math.round(res?.vote_average * 10)}%
            </cite>
          </li>
        </ul>
        <cite style={{ marginLeft: "2%" }}>Length: {res?.runtime} Minutes</cite>
        <p>{res?.overview}</p>
        <h4 style={{ marginBottom: "3%" }}>Share this!</h4>
        <a
          href={"sms:?&body=You need to watch this! " + window.location.href}
          target="_blank"
          rel="noopener noreferrer"
          className="socialShare"
        >
          <FaSms />
        </a>
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
        <div className="recommended" style={{ paddingBottom: "30%" }}>
          <Swiper pagination={true} modules={[Pagination]}>
            {recommend
              ?.filter((items, idx) => idx < 5)
              .map((item) => {
                return (
                  <SwiperSlide
                    style={{
                      paddingBottom: "5%",
                      paddingTop: "10%",
                      marginLeft: "auto",
                    }}
                  >
                    <h3 style={{ textAlign: "center", marginBottom: "5%" }}>
                      If you like {res?.title} then you might like this!
                    </h3>
                    <div className="card" style={{ height: "450px" }}>
                      <Link to={`/MoviePage/${item.id}`} className="linkName">
                        <img
                          src={
                            `https://image.tmdb.org/t/p/w500/` +
                            item?.backdrop_path
                          }
                          alt="movie poster"
                        />
                        <h2>{item.title}</h2>
                      </Link>
                      <p>{item.overview}</p>
                      <ul className="top">
                        <li className="li1">
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
