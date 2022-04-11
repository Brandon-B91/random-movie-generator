import React, {useState} from "react";
import Header from "./components/Header";
import AutoLoad from "./components/AutoLoad";
import Nav from './components/Nav'
import AutoLoadTv from './components/AutoLoadTv'
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <div className="App">
        <AutoLoad />
        <AutoLoadTv />
        <Nav />
      </div>
    </>
  );
};

export default App;
