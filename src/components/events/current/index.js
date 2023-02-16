import React from "react";

import DateNote from "../../dateNote";
import AnnounceWidget from "./announceWidget";

import "./index.scss";

const CurrentEventWidget = ({eventInfo}) => {
  console.log({eventInfo});

  return (
    <div className="eventCurrent">
      <div className="eventCurrent-content">
        <div className="eventCurrent-date">
          <DateNote dtStart={eventInfo.dt_start} dtEnd={eventInfo.dt_end} />
        </div>
        <div className="eventCurrent-title">{eventInfo.title}</div>
        <AnnounceWidget eventInfo={eventInfo} />
      </div>
    </div>
  );
};

export default CurrentEventWidget;
