import React from "react";
import ReactDOM from "react-dom";
//'Provider' là rổ để chứa toàn bộ redux
import { Provider } from "react-redux";
//'createStore' để tạo môi trường chứa các props của app
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//'reducer' đẩy data vào các props
import rootReducer from "./reducers";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

export const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
