import React, {useState, useEffect} from "react";

import "./index.scss";

const DatetimeWidget = ({hasEvents}) => {
  return (
    <div className={`datetime ${hasEvents ? "datetime-mini" : "datetime-full"}`}>
      <TimeComponent />
      <DateComponent />
    </div>
  );
};

const TimeComponent = () => {
  const [time, setTime] = useState(getTime());

  function getTime() {
    return new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    const interval = 1000 * 60;
    setInterval(() => {
      setTime(getTime());
    }, interval);
  }, []);

  return <div className="time">{time}</div>;
};

const DateComponent = () => {
  const [date, setDate] = useState(getDate());
  const [weekday, setWeekday] = useState(getWeekday());

  function getDate() {
    const dateOptions = {
      day: "numeric",
      month: "long",
    };
    return new Date().toLocaleDateString("ru-RU", dateOptions);
  }

  function getWeekday() {
    const dateOptions = {
      weekday: "long",
    };
    return new Date().toLocaleDateString("ru-RU", dateOptions);
  }

  useEffect(() => {
    const interval = 1000 * 60 * 60 * 24;
    setInterval(() => {
      setDate(getDate());
      setWeekday(getWeekday());
    }, interval);
  }, []);

  return (
    <div className="date">
      <div className="date_day">{date}</div>
      <div className="date_weekday">{weekday}</div>
    </div>
  );
};

export default DatetimeWidget;
