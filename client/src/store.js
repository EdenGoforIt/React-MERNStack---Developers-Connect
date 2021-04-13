import { createStore, applyMiddleware } from "redux";

//reducers, initial state and middles wares

const store = createStore(() => [], {}, applyMiddleware());

export default store;
