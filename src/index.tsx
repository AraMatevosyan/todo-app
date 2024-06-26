import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux";

const container = document.getElementById("root");
if (container) {
  const root = ReactDOMClient.createRoot(container);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
}
