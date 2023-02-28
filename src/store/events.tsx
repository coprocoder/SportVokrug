import {makeAutoObservable} from "mobx";
import {EventsSet} from "../components/events/types";

interface IEventsStore {
  items: EventsSet;
}

class EventsStore implements IEventsStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new EventsStore();
