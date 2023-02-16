import React, {useEffect, useState} from "react";

import Timer, {TimerModes} from "./circularTimer";

import "./index.scss";
import EventStartedPlug from "./startedPlug";

const AnnounceWidget = ({eventInfo}) => {
  const [isStarted, setStarted] = useState(checkStatus());

  function checkStatus() {
    // TODO: set <
    return new Date() > new Date(eventInfo.dt_start);
  }

  useEffect(() => {
    setTimeout(() => {
      const started = checkStatus();
      if (started !== isStarted) setStarted(started);
    }, 1000);
  }, [eventInfo]);

  return (
    <div className="announceWidget">
      {isStarted ? (
        <div className="announceWidget-timers">
          <Timer endTime={eventInfo.dt_end} config={TimerModes.DAY} />
          <Timer endTime={eventInfo.dt_end} config={TimerModes.HOUR} />
          <Timer endTime={eventInfo.dt_end} config={TimerModes.MINUTE} />
          <Timer endTime={eventInfo.dt_end} config={TimerModes.SECOND} />
        </div>
      ) : (
        <EventStartedPlug />
      )}
    </div>
  );
};

export default AnnounceWidget;
