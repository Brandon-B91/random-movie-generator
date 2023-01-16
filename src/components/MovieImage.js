import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``;

const MovieImage = (props) => {
  return (
    <img
      src={
        props.item?.poster_path !== null
          ? props.baseUrl + props.item?.poster_path
          : setTimeout(photo, 700)
      }
      alt="movie poster"
      className={props.className}
    />
  );
};

export default MovieImage;
