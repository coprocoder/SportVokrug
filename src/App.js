import React, {useContext, useEffect, useState} from "react";

import DatetimeWidget from "./components/datetimeWidget";

import "./App.scss";
import CurrentEventWidget from "./components/events/current";
import NextEventWidget from "./components/events/next";
import {EventsContext} from "./contexts/EventsContext";

function App() {
  const {events} = useContext(EventsContext);
  const hasEvents = !!events.length;

  useEffect(() => {
    // For handle mobile screen height
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <DatetimeWidget hasEvents={hasEvents} />
      {hasEvents && <CurrentEventWidget eventInfo={events[0]} />}
      {hasEvents && <NextEventWidget eventInfo={events[1]} />}
    </div>
  );
}

export default App;
