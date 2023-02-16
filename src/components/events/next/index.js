import React from "react";

import DateNote from "../../dateNote";

import "./index.scss";

const NextEventWidget = ({eventInfo}) => {
  return (
    <div className="eventNext">
      <DateNote dtStart={eventInfo.dt_start} dtEnd={eventInfo.dt_end} />
      <div className="eventNext-title">{eventInfo.title}</div>
    </div>
  );
};

export default NextEventWidget;
