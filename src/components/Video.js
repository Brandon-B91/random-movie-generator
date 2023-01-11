import React from 'react'

const baseUrl = ``;

const Video = (props) => {
  return (
    <iframe
    // width="500"
    // height="300"
    src={props.baseUrl + props.item?.videos.results[0].key}
    title="Youtube Player"
    frameborder="0"
    allowFullScreen
  />
  )
}

export default Video