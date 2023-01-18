import React, { useEffect, useParams, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DropDown from "../components/DropDown";
import Nav from "../components/Nav";
import MovieSearch from "../components/MovieSearch";
import { FaSearch } from "react-icons/fa";
import MovieImage from "../components/MovieImage";
import TopRatedMovies from "../components/TopRatedMovies";

const Movies = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showRandom, setShowRandom] = useState(false);
  const [res, setRes] = useState();

  const showSearchDiv = () => {
    setShowSearch((isVisible) => !isVisible);
    setShowRandom(false);
  };

  const showRandomDiv = () => {
    setShowRandom((isVisible) => !isVisible);
    setShowSearch(false);
  };

  useEffect(() => {
    const id = localStorage.getItem("searchItem");
    const auto = fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f79df266a37e366257a09e6b64a14de9&language=en-US&append_to_response=watch%2Fproviders,recommendations,now_playing`
    )
      .then((response) => response.json())
      .then((response) => {
        let res = response;
        setRes(res);
      }); 
  }, []);

  return (
    <div className="movie">
      <Header />
      <h2>Discover a new movie!</h2>
      <p>You can search for a movie or discover a new one!</p>
      <div className="showBtns">
        <button onClick={showSearchDiv}>
          Search <FaSearch />
        </button>
        <button onClick={showRandomDiv}>
          Discover <FaSearch />
        </button>
      </div>
      {showRandom ? <DropDown /> : null}
      {showSearch ? <MovieSearch /> : null}
      {localStorage.getItem("searchItem") !== null ? (
        <Link to={`/MoviePage/${res.id}`} className="linkName">
          <MovieImage
            item={res}
            baseUrl={"https://image.tmdb.org/t/p/w500/"}
            className={"card"}
          />
        </Link>
      ) : null}
      <TopRatedMovies />
      <Nav />
    </div>
  );
};

export default Movies;
