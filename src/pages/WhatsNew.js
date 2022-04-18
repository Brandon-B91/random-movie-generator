import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav"

const WhatsNew = () => {
  return (
    <>
      <Header />
      <div className="whatsNew">
        <h3>Hey there!</h3>
        <p>
          We are glad to see you're back! a few things have changed. since the
          first release / launch of Movie Night! (formerly known as "Random
          Movie Generator"). Here we will talk a little bit about the first release
          and what has changed here in this update. Also what is coming up in the near future
          and any new features we are working on!
        </p>

        <h4>What's new?</h4>
        <ul>
          <li>Search now returns multiple results.</li>
          <cite className="red">
            We had received some feedback certain movies were not returning when
            being searched.
          </cite>
          <li>
            We removed the "Where to watch" and "where to buy" from the main
            display pages, don't worry! just click on the result you want for
            deatailed information!
          </li>
          <cite className="red">
            We had received some feedback that it just didn't look well.
          </cite>
          <li>
            Added a recommended section when searching or viewing a movie / tv
            show for similar results!
          </li>
          <cite className="red">
            This actually was not a feedback tip just a quality of life
            improvement.
          </cite>
          <li>
            Some general UI changes just to make the app more user friendly and
            modern looking.
          </li>
          <cite className="red">This one is pretty self explanatory.</cite>
        </ul>

        <h4>What's coming?</h4>
        <ul>
          <li>Add to favorites!</li>
          <cite className="red">
            This one is highly requested but is taking some time to make it work
            properly so be patient ;)
          </cite>
          <li>Personalized recommendations.</li>
          <cite className="red">
            This one will take some time so don't hold your breathe!
          </cite>
          <li>
            Any feedback that is a general improvement will be considered and
            implemented in a timely fashion. Also credit will be given to any contributors from here on out.
          </li>
          <cite className="red">
            We love the feedback weve gotten and wouldn't mind more!
          </cite>
          <li>Search by actors / actress name.</li>
          <cite>This was just a feature we like and would like to implement</cite>
          <li>Share buttons! Find something you like and want to send it someone? Yeah, who doesn't... Were working on it!</li>
          <cite>Just another quality of life feature!</cite>
          <li>Add in images and videos related to the search result.</li>
          <cite>Just another quality of life feature!</cite>
        </ul>
      </div>
      <Nav />
    </>
  );
};

export default WhatsNew;
