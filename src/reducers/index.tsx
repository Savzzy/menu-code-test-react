import { ACTION_TYPES } from "../constants";
import {
  ActionTypes,
  ChangeActiveDiner,
  UpdateErrorState,
  Store,
} from "../types";
import addItemToOrder from "./addItemToOrder";
import removeItemFromOrder from "./removeItemFromOrder";
import { cloneObject } from "../__test-utils__/cloneObject";

const rootReducer = (store: Store, action: ActionTypes): Store => {
  switch (action.type) {
    case ACTION_TYPES.ADD_DISH: {
      return addItemToOrder(cloneObject<Store>(store), action.payload);
    }
    case ACTION_TYPES.REMOVE_DISH: {
      return removeItemFromOrder(cloneObject<Store>(store), action.payload);
    }
    case ACTION_TYPES.CHANGE_ACTIVE_DINER: {
      const updatedStore = cloneObject<Store>(store);
      updatedStore.activeDiner = (action.payload as ChangeActiveDiner).activeDiner;
      return updatedStore;
    }
    case ACTION_TYPES.UPDATE_ERROR: {
      const updatedStore = cloneObject<Store>(store);
      updatedStore.error = (action.payload as UpdateErrorState).error;
      return updatedStore;
    }
    case ACTION_TYPES.RESET_STORE: {
      return action.payload as Store;
    }
    default: {
      return store;
    }
  }
};

export default rootReducer;
