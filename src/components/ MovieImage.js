import React from "react";
import photo from "../images/photo.png";


const MovieImage = (props) => {
  return (
    <div className={props.className}>
      <img
        src={
          props.item?.poster_path == null
            ? photo
            : `https://image.tmdb.org/t/p/w500/` + props.item?.poster_path
        }
        alt="movie poster"
      />
    </div>
  );
};

export default MovieImage;
