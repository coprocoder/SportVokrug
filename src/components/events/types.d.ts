/*
    "title": "Международный шахматный форум \"Moscow Open\"",
    "is_main": false,
    "dt_start": "2022-07-14T16:00:00+03:00",
    "dt_end": "2022-07-20T20:00:00+03:00",
    "dt_create": "2022-06-28T11:18:29+03:00"
*/

export interface IEvent {
  title: string;
  is_main: boolean;
  dt_start: string;
  dt_end: string;
  dt_create: string;
}

export type EventsSet = Array<IEvent>;

export interface IEventProps {
  eventInfo: IEvent;
}
