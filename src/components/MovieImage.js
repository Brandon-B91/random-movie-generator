import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``;

const MovieImage = (props) => {
  function loadImage() {
    if (props.item?.poster_path !== null) {
      return props.baseUrl + props.item?.poster_path;
    } else {
      setTimeout(photo, 700);
    }
  }
  return (
    <img src={loadImage()} alt="movie poster" className={props.className} />
  );
};

export default MovieImage;
