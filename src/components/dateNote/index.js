import React, {useEffect, useState} from "react";
import "./index.scss";

const DateNote = ({dtStart = new Date().toISOString(), dtEnd = dtStart}) => {
  const [timeLabel, setTimeLabel] = useState(dtStart);

  useEffect(() => {
    setTimeLabel(genTimeLabel());
  }, [dtStart, dtEnd]);

  function genTimeLabel() {
    const isoToLocaleDate = (isoDate) => {
      const _date = new Date(isoDate);
      const offsetMs = _date.getTimezoneOffset() * 60 * 1000;
      const msLocal = _date.getTime() - offsetMs;
      return new Date(msLocal);
    };

    let dateStart = isoToLocaleDate(dtStart);
    let dateEnd = isoToLocaleDate(dtEnd);
    let timeLabel = dateStart.toLocaleDateString();

    if (dateStart !== dateEnd) {
      let dateOptions = {};
      if (dateStart.getMonth() - dateEnd.getMonth()) {
        dateOptions = {
          day: "numeric",
          month: "long",
        };
      } else if (dateStart.getDay() - dateEnd.getDay()) {
        dateOptions = {
          day: "numeric",
        };
      }
      const _dStart = dateStart.toLocaleDateString("ru-RU", dateOptions);
      const _dEnd = dateEnd.toLocaleDateString("ru-RU");
      timeLabel = `${_dStart}-${_dEnd}`;
    }

    return timeLabel;
  }

  return <div className="dateNote">{timeLabel}</div>;
};

export default DateNote;
