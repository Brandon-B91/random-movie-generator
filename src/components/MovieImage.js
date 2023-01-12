import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``;

setTimeout(() => {
  return photo;
}, 100);

const MovieImage = (props) => {
  return (
    <img
      src={
        props.item?.poster_path == null
          ? photo
          : props.baseUrl + props.item?.poster_path
      }
      alt="movie poster"
      className={props.className}
    />
  );
};

export default MovieImage;
