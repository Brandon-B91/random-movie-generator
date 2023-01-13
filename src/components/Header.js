import React from "react";
import logo from "../images/Movie.png";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="header-logo">
          <img src={logo} alt="logo" className="header-img" />
        </div>
        <div className="header-body">
          <h1 className="header-h1">Movie Night!</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
