import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``;
const className = "";

const MovieBackdrop = (props) => {
  function loadImage() {
    if (props.item?.poster_path !== null) {
      return props.baseUrl + props.item?.poster_path;
    } else {
      setTimeout(photo, 700);
    }
  }
  return (
    <div className={""}>
      <img src={loadImage()} alt="movie poster" className={props.className} />
    </div>
  );
};

export default MovieBackdrop;
