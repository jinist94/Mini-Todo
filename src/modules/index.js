import { createStore } from "redux";
import todoReducer from "./todo";

const rootReducer = todoReducer;

const store = createStore(rootReducer);

export default store;
