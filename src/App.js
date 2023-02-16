import React, {useEffect, useState} from "react";

import DatetimeWidget from "./components/datetimeWidget";

import "./App.scss";
import CurrentEventWidget from "./components/events/current";
import NextEventWidget from "./components/events/next";

function App() {
  const [events, setEvents] = useState([]);
  const hasEvents = !!events.length;

  const getData = async () => {
    const response = await fetch("https://beta.sosportom.ru/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          "query videostandEvents ($videostand_id: ID!) { videostandEvents(videostand_id: $videostand_id) { current_and_upcoming { title, is_main, dt_start, dt_end, dt_create }, finished { title, is_main, dt_start, dt_end, dt_create } } }",
        variables: {videostand_id: "6"},
      }),
    });
    return response.json();
  };

  useEffect(() => {
    getData().then((res) => {
      const events = res?.data?.videostandEvents?.current_and_upcoming || [];
      console.log(events);
      setEvents(events);
    });
  }, []);

  return (
    <div className={`App ${hasEvents ? "App-inited" : "App-empty "}`}>
      <DatetimeWidget hasEvents={hasEvents} />
      {events.length > 0 && <CurrentEventWidget eventInfo={events[0]} />}
      {events.length > 1 && <NextEventWidget eventInfo={events[1]} />}
    </div>
  );
}

export default App;
