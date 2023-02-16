import React, {useEffect, useState} from "react";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./index.scss";

const CircularTimer = ({startTime, config}) => {
  const [value, setValue] = useState(calcProgressValue());

  useEffect(() => {
    setInterval(() => {
      setValue(calcProgressValue());
    }, 1000);
  }, [startTime, config]);

  function calcProgressValue() {
    const deltaMs = new Date(startTime) - new Date();
    let fullCircleInterval = 0;
    if (config === TimerModes.DAY) {
      fullCircleInterval = TimerModes.DAY.interval * 7;
    } else if (config === TimerModes.HOUR) {
      fullCircleInterval = TimerModes.DAY.interval;
    } else if (config === TimerModes.MINUTE) {
      fullCircleInterval = TimerModes.HOUR.interval;
    } else if (config === TimerModes.SECOND) {
      fullCircleInterval = TimerModes.MINUTE.interval;
    }

    let usefulTime = deltaMs % fullCircleInterval;
    let progress = (usefulTime / fullCircleInterval) * 100;
    const number = Math.floor(usefulTime / config.interval);

    return {progress, number};
  }

  return (
    <div className="circularTimer">
      <CircularProgressbarWithChildren
        value={value.progress}
        styles={buildStyles({
          textColor: "red",
          pathColor: config.lineColor,
          trailColor: "transparent",
          strokeLinecap: "butt",
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

export default CircularTimer;
