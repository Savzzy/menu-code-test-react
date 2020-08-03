import { ACTION_TYPES } from "../constants";
import {
  ActionTypes,
  ChangeActiveDiner,
  UpdateErrorState,
  Store,
} from "../types";
import addItemToOrder from "./addItemToOrder";
import removeItemFromOrder from "./removeItemFromOrder";

const rootReducer = (store: Store, action: ActionTypes): Store => {
  switch (action.type) {
    case ACTION_TYPES.ADD_DISH: {
      return addItemToOrder(Object.assign({}, store), action.payload);
    }
    case ACTION_TYPES.REMOVE_DISH: {
      return removeItemFromOrder(Object.assign({}, store), action.payload);
    }
    case ACTION_TYPES.CHANGE_ACTIVE_DINER: {
      const updatedStore = Object.assign({}, store);
      updatedStore.activeDiner = (action.payload as ChangeActiveDiner).activeDiner;
      return updatedStore;
    }
    case ACTION_TYPES.UPDATE_ERROR: {
      const updatedStore = Object.assign({}, store);
      updatedStore.error = (action.payload as UpdateErrorState).error;
      return updatedStore;
    }
    default: {
      return store;
    }
  }
};

export default rootReducer;
