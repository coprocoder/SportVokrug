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
  }, [eventInfo]);

  return (
    <div className="announceWidget">
      {isStarted ? (
        <div className="announceWidget-timers">
          <CircularTimer endTime={eventInfo.dt_end} config={TimerModes.DAY} />
          <CircularTimer endTime={eventInfo.dt_end} config={TimerModes.HOUR} />
          <CircularTimer
            endTime={eventInfo.dt_end}
            config={TimerModes.MINUTE}
          />
          <CircularTimer
            endTime={eventInfo.dt_end}
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
