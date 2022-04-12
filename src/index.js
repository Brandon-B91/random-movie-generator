import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/TvShows" element={<TvShows />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
  serviceWorkerRegistration.register()
);

