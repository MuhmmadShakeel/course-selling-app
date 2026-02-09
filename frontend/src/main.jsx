import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./index.css"; 
import { ContextProvider } from "./context/ContextStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
