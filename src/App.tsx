import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";

import DatetimeWidget from "./components/datetimeWidget";

import CurrentEventWidget from "./components/events/current";
import NextEventWidget from "./components/events/next";
import events from "./store/events";

import "./App.scss";

const App = observer(() => {
  const hasEvents = !!events.items.length;

  useEffect(() => {
    events.updateEventsFromAPI();

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
      <DatetimeWidget />
      {hasEvents && <CurrentEventWidget eventInfo={events.items[0]} />}
      {hasEvents && <NextEventWidget eventInfo={events.items[1]} />}
    </div>
  );
});

export default App;
