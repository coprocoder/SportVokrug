import React, {useEffect, useState} from "react";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./index.scss";

const Timer = ({endTime, config}) => {
  const [value, setValue] = useState(calcProgressValue());

  useEffect(() => {
    setInterval(() => {
      setValue(calcProgressValue());
    }, config.interval);
  }, [endTime, config]);

  function calcProgressValue() {
    const deltaMs = new Date(endTime) - new Date();
    let resValue = 0;
    if (config === TimerModes.DAY) {
      const deltaDay = deltaMs / config.interval;
      resValue = deltaDay;
    } else if (config === TimerModes.HOUR) {
      const deltaDay = (deltaMs % TimerModes.DAY.interval) / config.interval;
      resValue = deltaDay;
    } else if (config === TimerModes.MINUTE) {
      const deltaDay = (deltaMs % TimerModes.HOUR.interval) / config.interval;
      resValue = deltaDay;
    } else if (config === TimerModes.SECOND) {
      const deltaDay = (deltaMs % TimerModes.MINUTE.interval) / config.interval;
      resValue = deltaDay;
    }
    return resValue;
  }

  return (
    <div className="circularTimer">
      <CircularProgressbarWithChildren
        value={value}
        styles={buildStyles({
          textColor: "red",
          pathColor: config.lineColor,
          trailColor: "transparent",
        })}
        counterClockwise
      >
        <div className="circularTimer-value">{Math.floor(value)}</div>
        <div className="circularTimer-label">{config.label}</div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export const TimerModes = {
  DAY: {
    lineColor: "#0062B5",
    label: "дней",
    interval: 1000 * 60 * 60 * 24,
  },
  HOUR: {
    lineColor: "#D62F0D",
    label: "часов",
    interval: 1000 * 60 * 60,
  },
  MINUTE: {
    lineColor: "#FDAE47",
    label: "минут",
    interval: 1000 * 60,
  },
  SECOND: {
    lineColor: "#51ACD8",
    label: "секунд",
    interval: 1000,
  },
};

export default Timer;
