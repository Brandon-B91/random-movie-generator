import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``
const className = ""

const MovieBackdrop = (props) => {
  return (
    <div className={''}>
      <img
        src={
          props.item?.backdrop_path == null
            ? photo
            : props.baseUrl + props.item?.backdrop_path
        }
        alt="movie poster"
        className={props.className}
      />
    </div>
  );
};

export default MovieBackdrop;