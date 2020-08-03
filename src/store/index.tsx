import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import { Diners, Store } from "../types";

export const initialStore: Store = {
  order: {},
  activeDiner: Diners.diner1,
};

export const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(),
);
