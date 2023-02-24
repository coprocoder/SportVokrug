export interface ITimerMode {
  lineColor: string;
  label: string;
  interval: number;
}

interface ITImerModes {
  [key: string]: ITimerMode;
}

const TimerModes: ITImerModes = {
  DAY: {
    lineColor: "#0062B5",
    label: "дней",
    interval: 1000 * 60 * 60 * 24,
  },
  HOUR: {
    lineColor: "#D62F0D",
    label: "часов",
    interval: 1000 * 60 * 60,
  },
  MINUTE: {
    lineColor: "#FDAE47",
    label: "минут",
    interval: 1000 * 60,
  },
  SECOND: {
    lineColor: "#51ACD8",
    label: "секунд",
    interval: 1000,
  },
};

export default TimerModes;
