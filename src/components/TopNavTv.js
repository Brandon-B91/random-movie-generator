import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoShare } from "react-icons/io5"

const TopNav = (props) => {
  const favorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState) ? <FaRegHeart /> : <FaHeart />;

    localStorage.getItem(props.res.name) == null
      ? localStorage.setItem(props.res.name, props.res.id)
      : localStorage.removeItem(props.res.name);
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
      <a
        href={"sms:?&body=You need to watch this! " + window.location.href}
        target="_blank"
        rel="noopener noreferrer"
        className="socialShare"
      >
        <IoShare/>
      </a>
      <button
        onClick={() => {
          favorite();
          animate();
        }}
        className={bounce ? "bounce" : "favorite"}
      >
        {/* {isFavorite ? <FaHeart /> : <FaRegHeart />}{" "} */}
        {localStorage.getItem(props.res?.name) == null ? (
          <FaRegHeart />
        ) : (
          <FaHeart />
        )}
      </button>
    </div>
  );
};

export default TopNav;
