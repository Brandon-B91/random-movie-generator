import React from "react";
import photo from "../images/photo.png";

const baseUrl = ``
const className = ""

const ActorImg = (props) => {
  return (
    <div className={''}>
      <img
        src={
          props.item?.profile_path == null
            ? photo
            : props.baseUrl + props.item?.profile_path
        }
        alt="movie poster"
        className={props.className}
      />
    </div>
  );
};

export default ActorImg;