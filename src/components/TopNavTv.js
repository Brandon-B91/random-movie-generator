import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft, FaHeart, FaRegHeart } from "react-icons/fa";


const TopNav = (props) => {
  const favorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState) ? <FaRegHeart /> : <FaHeart />
    // if (newFavoriteState) {
    //   let arrObjectTv = [];
    //   if (
    //     localStorage.getItem("arrObjectTv") &&
    //     localStorage.getItem("arrObjectTv").length > 0
    //   )
    //     arrObjectTv = JSON.parse(localStorage.getItem("arrObjectTv"));
    //   let arrObj = {
    //     name: props.res.title,
    //     id: props.res.id,
    //     img: props.res.poster_path,
    //     overview: props.res.overview,
    //   };
    //   arrObjectTv.push(arrObj);
    //   localStorage.setItem("arrObjectTv", JSON.stringify(arrObjectTv));
    // }

    localStorage.getItem(props.res.name) == null ? localStorage.setItem(props.res.name, props.res.name) : localStorage.removeItem(props.res.name);
  };
  const animate = () => {
    setBounce(true);

    setTimeout(() => setBounce(false), 1000);
  };

  const navigate = useNavigate();

  const [bounce, setBounce] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="top-nav">
      <button onClick={() => navigate(-1)} className="back">
        <FaLongArrowAltLeft className="back-arrow" />
      </button>
      <button
        onClick={() => {
          favorite();
          animate();
        }}
        className={bounce ? "bounce" : "favorite"}
      >
        {/* {isFavorite ? <FaHeart /> : <FaRegHeart />}{" "} */}
        {localStorage.getItem(props.res?.name) == null ?  <FaRegHeart /> : <FaHeart /> }
      </button>
    </div>
  );
};

export default TopNav;
