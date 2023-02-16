import {render} from "@testing-library/react";
import DateLabel from ".";

/**
 * Date label tests
 */

describe("Date labels", () => {
  it("One day", () => {
    const dStart = "2023-02-17T12:00:00+03:00";
    const dEnd = "2023-02-17T12:00:00+03:00";
    const {container} = render(<DateLabel dtStart={dStart} dtEnd={dEnd} />);
    expect(container.textContent).toBe("17.02.2023");
  });

  it("Few days", () => {
    const dStart = "2023-02-12T12:00:00+03:00";
    const dEnd = "2023-02-17T12:00:00+03:00";
    const {container} = render(<DateLabel dtStart={dStart} dtEnd={dEnd} />);
    expect(container.textContent).toBe("12-17.02.2023");
  });

  it("Few months", () => {
    const dStart = "2023-01-12T12:00:00+03:00";
    const dEnd = "2023-02-17T12:00:00+03:00";
    const {container} = render(<DateLabel dtStart={dStart} dtEnd={dEnd} />);
    expect(container.textContent).toBe("12.01-17.02.2023");
  });

  it("Few years", () => {
    const dStart = "2022-01-12T12:00:00+03:00";
    const dEnd = "2023-02-17T12:00:00+03:00";
    const {container} = render(<DateLabel dtStart={dStart} dtEnd={dEnd} />);
    expect(container.textContent).toBe("12.01.2022-17.02.2023");
  });
});
