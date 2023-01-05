import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft, FaHeart, FaRegHeart } from "react-icons/fa";


const TopNav = (props) => {
  const favorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    // if (newFavoriteState) {
    //   let arrObject = [];
    //   if (
    //     localStorage.getItem("arrObject") &&
    //     localStorage.getItem("arrObject").length > 0
    //   )
    //     arrObject = JSON.parse(localStorage.getItem("arrObject"));
    //   let arrObj = {
    //     name: props.res.title,
    //     id: props.res.id,
    //     img: props.res.poster_path,
    //     overview: props.res.overview,
    //   };
    //   arrObject.push(arrObj);
    //   localStorage.setItem("arrObject", JSON.stringify(arrObject));
    // }
    //  else if (!newFavoriteState) {
    //     let removeData = JSON.parse(localStorage.getItem('arrObject'))
    //     for(let i = 0; i < removeData.length; i++){
    //     if(data[i].name === res.title) {
    //       localStorage.removeItem()
    //     }
    //   }
    // }

    localStorage.getItem(props.res.title) === null ? localStorage.setItem(props.res.title, props.res.title) : localStorage.removeItem(props.res.title);
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
        {localStorage.getItem(props.res?.title) == null ?  <FaRegHeart /> : <FaHeart /> }
      </button>
    </div>
  );
};

export default TopNav;
