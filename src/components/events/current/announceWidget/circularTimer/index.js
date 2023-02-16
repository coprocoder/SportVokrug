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
    }, 1000);
  }, [endTime, config]);

  function calcProgressValue() {
    const deltaMs = new Date(endTime) - new Date();
    let usefulTime = 0;
    let progress = 0;
    if (config === TimerModes.DAY) {
      usefulTime = deltaMs % (TimerModes.DAY.interval * 7);
      progress = (usefulTime / (TimerModes.DAY.interval * 7)) * 100;
    } else if (config === TimerModes.HOUR) {
      usefulTime = deltaMs % TimerModes.DAY.interval;
      progress = (usefulTime / TimerModes.DAY.interval) * 100;
    } else if (config === TimerModes.MINUTE) {
      usefulTime = deltaMs % TimerModes.HOUR.interval;
      progress = (usefulTime / TimerModes.HOUR.interval) * 100;
    } else if (config === TimerModes.SECOND) {
      usefulTime = deltaMs % TimerModes.MINUTE.interval;
      progress = (usefulTime / TimerModes.MINUTE.interval) * 100;
    }

    return {
      progress: progress,
      number: Math.floor(usefulTime / config.interval),
    };
  }

  return (
    <div className="circularTimer">
      <CircularProgressbarWithChildren
        value={value.progress}
        styles={buildStyles({
          textColor: "red",
          pathColor: config.lineColor,
          trailColor: "transparent",
        })}
        counterClockwise
      >
        <div className="circularTimer-value">{value.number}</div>
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
