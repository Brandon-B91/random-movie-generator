import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import Favorites from './pages/Favorites'
import MoviePage from './pages/MoviePage'
import TvPage from './pages/TvPage'
import WhatsNew from './pages/WhatsNew'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/TvShows" element={<TvShows />} />
      <Route path="/Favorites" element={<Favorites />} /> 
      <Route path="/WhatsNew" element={<WhatsNew />} /> 
      <Route path="/MoviePage/:id" element={<MoviePage />} /> 
      <Route path="/TvPage/:id" element={<TvPage />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
  serviceWorkerRegistration.register()
);


