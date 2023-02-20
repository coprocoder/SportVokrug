import React, {useEffect, useState} from "react";
import "./index.scss";

const DateLabel = ({dtStart = new Date().toISOString(), dtEnd = dtStart}) => {
  const [timeLabel, setTimeLabel] = useState(dtStart);

  useEffect(() => {
    setTimeLabel(genTimeLabel());
  }, [dtStart, dtEnd]);

  function genTimeLabel() {
    let dateStart = new Date(dtStart);
    let dateEnd = new Date(dtEnd);
    let timeLabel = dateStart.toLocaleDateString("ru-RU");

    // Check time range
    if (dateStart.toDateString() !== dateEnd.toDateString()) {
      let dateFormatOptions = {};
      if (dateStart.getFullYear() - dateEnd.getFullYear()) {
        dateFormatOptions = {};
      } else if (dateEnd.getMonth() - dateStart.getMonth()) {
        dateFormatOptions = {
          day: "2-digit",
          month: "2-digit",
        };
      } else if (dateEnd.getDate() - dateStart.getDate()) {
        dateFormatOptions = {
          day: "2-digit",
        };
      }
      const _dStart = dateStart.toLocaleDateString("ru-RU", dateFormatOptions);
      const _dEnd = dateEnd.toLocaleDateString("ru-RU");
      timeLabel = `${_dStart}-${_dEnd}`;
    }

    return timeLabel;
  }

  return <div className="dateLabel">{timeLabel}</div>;
};

export default DateLabel;
