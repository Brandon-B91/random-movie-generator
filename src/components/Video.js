import React, { useState } from "react";

const baseUrl = ``;

const Video = (props) => {
 const [id, setId] = useState([]);
 let ids = ''

 props.res?.videos.results.map((item) => {
   return item.type == "Trailer" ? ids = item.key : null
 })

 return (
  <iframe
  src={props.baseUrl + ids}
  title="Youtube Player"
  frameborder="0"
  allowFullScreen
/>
 )
};

export default Video;
