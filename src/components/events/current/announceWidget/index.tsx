import React, {useEffect, useState} from "react";

import CircularTimer from "./circularTimer";
import EventStartedPlug from "./startedPlug";

import {observer} from "mobx-react-lite";
import "./index.scss";
import {IEventProps} from "../../types";
import events from "../../../../store/events";
import TimerModes from "./circularTimer/modes";

const AnnounceWidget = observer(({eventInfo}: IEventProps) => {
  const [isStarted, setStarted] = useState(checkStarted());

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
          events.items = events.items.slice(1);
          if (events.items.length < 3) {
            events.updateEventsFromAPI();
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
});

export default AnnounceWidget;
