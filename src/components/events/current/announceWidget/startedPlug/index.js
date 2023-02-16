import React from "react";
import {ReactComponent as ClockLogo} from "./clock.svg";

import "./index.scss";

const EventStartedPlug = () => {
  return (
    <div className="startedPlug">
      <div className="startedPlug-label">ИДЕТ СЕЙЧАС</div>
      <ClockLogo className="startedPlug-icon" />
    </div>
  );
};

export default EventStartedPlug;
