import React from "react";
import { Link } from "react-router-dom";

const WhatsNewBtn = () => {
  return (
    <div>
      <Link to="/WhatsNew" className="whatsNewBtn">
        {" "}
        What's new!{" "}
      </Link>
    </div>
  );
};

export default WhatsNewBtn;
