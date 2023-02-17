import React, {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";

export const EventsContext = createContext({});

const EventsProvider = ({children}) => {
  EventsProvider.propTypes = {
    children: PropTypes.element,
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    updateEventsFromAPI();
  }, []);

  async function updateEventsFromAPI() {
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
    const res = await response.json();
    const events = res?.data?.videostandEvents?.current_and_upcoming || [];
    setEvents(events);
  }

  const contextValue = {
    events,
    setEvents,
    updateEventsFromAPI,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
