import { createStore } from "redux";
import todoReducer from "./todo";

const rootReducer = todoReducer;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
