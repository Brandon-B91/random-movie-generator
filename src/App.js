import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AutoLoad from "./components/AutoLoad";
import AutoLoadDay from "./components/AutoLoadDay";
import AutoLoadTv from "./components/AutoLoadTv";
import AutoLoadTvDay from "./components/AutoLoadTvDay";
import Nav from "./components/Nav";
import "./App.css";
import WhatsNew from "./pages/WhatsNew";

const App = () => {
  const [day, setDay] = useState(true);
  const [week, setWeek] = useState(false);
  const [isToggled, setToggled] = useState(false);

  const onClickDay = () => {
    setDay((isVisible) => !isVisible);
    setWeek(false);
  };

  const onClickWeek = () => {
    setWeek((isVisible) => !isVisible);
    setDay(false);
  };

  return (
    <>
      <Header />
      <div className="App">
        <h3>See trending by day or week</h3>
        <label>
            <input type="checkbox" defaultChecked={<AutoLoadDay />} onClick={day ? onClickWeek : onClickDay}  />
            <span className="label-span"/>
        </label>
        {week ? <AutoLoad /> : null}
        {day ? <AutoLoadDay /> : null}
        {week ? <AutoLoadTv /> : null}
        {day ? <AutoLoadTvDay /> : null}
        <Nav />
      </div>
    </>
  );
};

export default App;
