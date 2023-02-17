import React from "react";

import DateNote from "../../dateLabel";

import "./index.scss";

const NextEventWidget = ({eventInfo}) => {
  return (
    <div className="eventNext">
      {eventInfo && (
        <>
          <DateNote dtStart={eventInfo.dt_start} dtEnd={eventInfo.dt_end} />
          <div className="eventNext-title">{eventInfo.title}</div>
        </>
      )}
    </div>
  );
};

export default NextEventWidget;
