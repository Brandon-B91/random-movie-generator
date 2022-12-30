import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``

const MovieImage = (props) => {
  return (
    <div className={""}>
      <img
        src={
          props.item?.poster_path == null
            ? photo
            : props.baseUrl + props.item?.poster_path
        }
        alt="movie poster"
        className={props.className}
      />
    </div>
  );
};

export default MovieImage;

