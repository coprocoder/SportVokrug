import React from "react";

import DateNote from "../../dateLabel";
import {IEventProps} from "../types";

import "./index.scss";

const NextEventWidget = ({eventInfo}: IEventProps) => {
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
