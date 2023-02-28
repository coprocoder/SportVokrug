import React from "react";
import ReactDOM from "react-dom/client";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

import reportWebVitals from "./reportWebVitals";
import App from "./App";

import "./index.scss";
import "./Text.scss";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const apolloClient = new ApolloClient({
  uri: "https://beta.sosportom.ru/graphql/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

reportWebVitals();
