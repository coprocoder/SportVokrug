import React, {useEffect, useState} from "react";
import "./index.scss";

const DateNote = ({dtStart = new Date().toISOString(), dtEnd = dtStart}) => {
  const [timeLabel, setTimeLabel] = useState(dtStart);

  useEffect(() => {
    // TODO: check time range
    setTimeLabel(isoToLocateDate());
  }, [dtStart, dtEnd]);

  function isoToLocateDate() {
    let _date = new Date(dtStart);
    const offsetMs = _date.getTimezoneOffset() * 60 * 1000;
    const msLocal = _date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    return dateLocal.toLocaleDateString();
  }

  return <div className="dateNote">{timeLabel}</div>;
};

export default DateNote;
