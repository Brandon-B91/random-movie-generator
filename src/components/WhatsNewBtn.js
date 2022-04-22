import React from "react";
import { Link } from "react-router-dom";

const WhatsNewBtn = () => {

  let storeThis = () => {
    sessionStorage.setItem('seen', 'seen')
  }

  return (
    <div>
      <Link to="/WhatsNew" className="whatsNewBtn" onClick={storeThis}>
        {" "}
        What's new!{" "}
      </Link>
    </div>
  );
};

export default WhatsNewBtn;
