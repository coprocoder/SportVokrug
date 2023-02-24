import {makeAutoObservable} from "mobx";
import {EventsSet} from "../components/events/types";

interface IEventsStore {
  items: EventsSet;
  error: Error | null;
}

class EventsStore implements IEventsStore {
  items = [];
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateEventsFromAPI() {
    fetch("https://beta.sosportom.ru/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          "query videostandEvents ($videostand_id: ID!) { videostandEvents(videostand_id: $videostand_id) { current_and_upcoming { title, is_main, dt_start, dt_end, dt_create }, finished { title, is_main, dt_start, dt_end, dt_create } } }",
        variables: {videostand_id: "6"},
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const events = res?.data?.videostandEvents?.current_and_upcoming || [];
        this.items = events;
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  }
}

export default new EventsStore();
