import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./user";
import logger from "redux-logger";
import thunk from "redux-thunk";
import todoReducer from "./todo";

const rootReducer = combineReducers({ todoReducer, userReducer });

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
