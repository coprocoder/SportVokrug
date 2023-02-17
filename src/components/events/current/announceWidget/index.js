import React, {useEffect, useState} from "react";

import CircularTimer, {TimerModes} from "./circularTimer";
import EventStartedPlug from "./startedPlug";

import "./index.scss";

const AnnounceWidget = ({eventInfo}) => {
  const [isStarted, setStarted] = useState(checkStatus());

  function checkStatus() {
    return new Date() < new Date(eventInfo.dt_start);
  }

  useEffect(() => {
    setTimeout(() => {
      const started = checkStatus();
      if (started !== isStarted) setStarted(started);
    }, 1000);
    // TODO: remove
    // eventInfo.dt_start = "2023-02-23T10:00:00+03:00"
  }, [eventInfo]);

  return (
    <div className="announceWidget">
      {isStarted ? (
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
      ) : (
        <EventStartedPlug />
      )}
    </div>
  );
};

export default AnnounceWidget;
