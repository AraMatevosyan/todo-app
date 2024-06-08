import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import store from "./redux";
import { Provider } from "react-redux";

const container = document.getElementById("root");
if (container) {
  const root = ReactDOMClient.createRoot(container);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
