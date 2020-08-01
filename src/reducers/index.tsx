import { ACTION_TYPES, UI_ERRORS } from "../constants";
import {
  ActionTypes,
  ChangeActiveDiner,
  Diners,
  ItemToAdd,
  ItemToRemove,
  OrderedItemType,
  PayloadTypes,
  Store,
  UpdateErrorState,
} from "../types";
import { canItemBeAdded } from "../util";

const addItemToOrder = (store: Store, payload: PayloadTypes) => {
  const activeDiner = store.activeDiner;

  if ((payload as ItemToAdd).menuCategory) {
    if (!store.order[activeDiner]) {
      store.order[activeDiner] = [];
    }

    const {
      menuItemId,
      menuItemName,
      menuItemPrice,
      menuCategory,
    } = payload as ItemToAdd;

    const { canBeAdded, error } = canItemBeAdded(
      menuItemId,
      menuItemName,
      store,
    );

    if (!canBeAdded) {
      store.error = error;
      return store;
    }

    store.order[activeDiner].push({
      menuItemId,
      menuItemName,
      menuItemPrice,
      menuCategory,
    });

    return store;
  }
};

const removeItemFromOrder = (store: Store, payload: PayloadTypes) => {
  const activeDiner = store.activeDiner;

  store.order[activeDiner] = store.order[activeDiner].filter(
    (orderedItem: OrderedItemType) => {
      return orderedItem.menuItemId !== (payload as ItemToRemove).menuItemId;
    },
  );

  return store;
};

const initialState: Store = {
  order: {},
  activeDiner: Diners.diner1,
  error: null,
};

const rootReducer = (store = initialState, action: ActionTypes) => {
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
