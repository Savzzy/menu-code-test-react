import { ACTION_TYPES } from "../constants";
import {
  ActionTypes,
  ChangeActiveDiner,
  Diners,
  ItemToAdd,
  ItemToRemove,
  OrderedItemType,
  PayloadTypes,
  Store,
} from "../types";

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
      store.activeDiner = (action.payload as ChangeActiveDiner).activeDiner;
      return store;
    }
    default: {
      return store;
    }
  }
};

export default rootReducer;
