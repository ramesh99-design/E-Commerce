import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./Store.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-right" autoClose={2500} />
  </Provider>,
);
