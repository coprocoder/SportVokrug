import React, {useContext, useEffect, useState} from "react";

import CircularTimer, {TimerModes} from "./circularTimer";
import EventStartedPlug from "./startedPlug";

import "./index.scss";
import {EventsContext} from "../../../../contexts/EventsContext";

const AnnounceWidget = ({eventInfo}) => {
  const [isStarted, setStarted] = useState(checkStarted());
  const {events, setEvents, updateEventsFromAPI} = useContext(EventsContext);

  function checkStarted() {
    return (
      new Date() >= new Date(eventInfo.dt_start) &&
      new Date() < new Date(eventInfo.dt_end)
    );
  }

  useEffect(() => {
    const _inter = setInterval(() => {
      const started = checkStarted();
      if (started != isStarted) {
        // If already started and now finished
        if (isStarted) {
          setEvents(events.slice(1));
          if (events.length < 3) {
            updateEventsFromAPI();
          }
        }
        setStarted(started);
        clearInterval(_inter);
      }
    }, 1000);
  }, [eventInfo, isStarted]);

  return (
    <div className="announceWidget">
      {isStarted ? (
        <EventStartedPlug />
      ) : (
        <div className="announceWidget-timers">
          <CircularTimer
            startTime={eventInfo.dt_start}
            config={TimerModes.DAY}
          />
          <CircularTimer
            startTime={eventInfo.dt_start}
            config={TimerModes.HOUR}
          />
          <CircularTimer
            startTime={eventInfo.dt_start}
            config={TimerModes.MINUTE}
          />
          <CircularTimer
            startTime={eventInfo.dt_start}
            config={TimerModes.SECOND}
          />
        </div>
      )}
    </div>
  );
};

export default AnnounceWidget;
