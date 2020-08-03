import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { UI_ERRORS } from "../constants";
import rootReducer from "../reducers";
import { Diners, Store } from "../types";

export const intialStore: Store = {
  order: {},
  activeDiner: Diners.diner1,
};

export const store = createStore(
  rootReducer,
  intialStore,
  composeWithDevTools(),
);
