import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useQuery} from "@apollo/client";

import DatetimeWidget from "./components/datetimeWidget";

import CurrentEventWidget from "./components/events/current";
import NextEventWidget from "./components/events/next";
import events from "./store/events";

import "./App.scss";
import {GET_ALL_EVENTS} from "./query/events";

const App = observer(() => {
  const {data, loading} = useQuery(GET_ALL_EVENTS, {
    variables: {
      videostand_id: "6",
    },
    fetchPolicy: "network-only",
    pollInterval: 60 * 1000,
  });
  const hasEvents = !!events.items?.length;

  useEffect(() => {
    if (!loading) {
      events.items = data.videostandEvents.current_and_upcoming;
    }
  }, [data]);

  useEffect(() => {
    // For handle mobile screen height change
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
