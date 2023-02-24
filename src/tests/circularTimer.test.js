import {render} from "@testing-library/react";
import CircularTimer from "../components/events/current/announceWidget/circularTimer";
import TimerModes from "../components/events/current/announceWidget/circularTimer/modes";

/**
 * Circular timer tests
 */

describe("Timer week", () => {
  const checkRenderedDaysDelta = (deltaDays = 0) => {
    let dt = new Date();
    dt.setDate(dt.getDate() + deltaDays);

    const {container} = render(
      <CircularTimer startTime={dt} config={TimerModes.DAY} />
    );

    const deltaMs = dt - new Date().getTime();
    const actualDeltaMs = deltaMs > 0 ? deltaMs : 0;

    const deltaDaysInMs = actualDeltaMs % (7 * TimerModes.DAY.interval);
    const expectedDaysVal = Math.floor(deltaDaysInMs / TimerModes.DAY.interval);

    const num = container.querySelector(".circularTimer-value").textContent;
    expect(num).toBe(String(expectedDaysVal));
  };
  it("More than week", () => {
    checkRenderedDaysDelta(9);
  });
  it("3 days", () => {
    checkRenderedDaysDelta(3);
  });
  it("7 days", () => {
    checkRenderedDaysDelta(7);
  });
  it("0 days", () => {
    checkRenderedDaysDelta(0);
  });
});

describe("Timer hours", () => {
  const checkRenderedHoursDelta = (deltaHours = 0) => {
    let dt = new Date();
    dt.setDate(dt.getHours() + deltaHours);

    const {container} = render(
      <CircularTimer startTime={dt} config={TimerModes.HOUR} />
    );

    const deltaMs = dt - new Date().getTime();
    const actualDeltaMs = deltaMs > 0 ? deltaMs : 0;
    const deltaDaysInMs = actualDeltaMs % TimerModes.DAY.interval;
    const expectedDaysVal = Math.floor(
      deltaDaysInMs / TimerModes.HOUR.interval
    );

    const num = container.querySelector(".circularTimer-value").textContent;
    expect(num).toBe(String(expectedDaysVal));
  };
  it("More than day", () => {
    checkRenderedHoursDelta(28);
  });
  it("3 hour", () => {
    checkRenderedHoursDelta(3);
  });
  it("24 hour", () => {
    checkRenderedHoursDelta(7);
  });
});
