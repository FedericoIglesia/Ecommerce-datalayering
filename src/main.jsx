import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
// import TagManager from "react-gtm-module";

// const TagManagerArgs = {
//   gtmId: "GTM-MMBD7SG",
// };

// TagManager.initialize(TagManagerArgs);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
