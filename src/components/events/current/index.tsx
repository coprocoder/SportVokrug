import React from "react";

import DateLabel from "../../dateLabel";
import {IEventProps} from "../types";
import AnnounceWidget from "./announceWidget";

import "./index.scss";

const CurrentEventWidget = ({eventInfo}: IEventProps) => {
  return (
    <div className="eventCurrent">
      <div className="eventCurrent-content">
        <div className="eventCurrent-date">
          <DateLabel dtStart={eventInfo.dt_start} dtEnd={eventInfo.dt_end} />
        </div>
        <div className="eventCurrent-title">{eventInfo.title}</div>
        <AnnounceWidget eventInfo={eventInfo} />
      </div>
    </div>
  );
};

export default CurrentEventWidget;
