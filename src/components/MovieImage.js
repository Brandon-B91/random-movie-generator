import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``;

const timer = setTimeout(() => {
  return photo
}, 100)

const MovieImage = (props) => {
  return (
    <div className={""}>
      <img
        src={
          props.item?.poster_path == null
            ? timer
            : props.baseUrl + props.item?.poster_path
        }
        alt="movie poster"
        className={props.className}
      />
    </div>
  );
};

export default MovieImage;
