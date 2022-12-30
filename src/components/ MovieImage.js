import React from "react";
import photo from "../images/photo.png";


const MovieImage = (props) => {
  return (
    <div className="card">
      <img
        src={
          props.item?.poster_path == null
            ? photo
            : `https://image.tmdb.org/t/p/w500/` + props.item?.poster_path
        }
        alt="movie poster"
      />

      {/* <img src={`https://image.tmdb.org/t/p/w500/` + props.item?.poster_path} alt="hi" /> */}
    </div>
  );
};

export default MovieImage;
