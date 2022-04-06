import React from "react";
import Header from "./components/Header";
import AutoLoad from "./components/AutoLoad";
import Nav from './components/Nav'
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <div className="App">
        <AutoLoad />
        <Nav />
      </div>
    </>
  );
};

export default App;
