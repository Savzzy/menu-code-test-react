import { Store, PayloadTypes, ItemToAdd } from "../types";
import { canItemBeAdded, isCheeseCakePresent } from "../util";

const addItemToOrder = (store: Store, payload: PayloadTypes) => {
  const activeDiner = store.activeDiner;
  const itemToAdd = payload as ItemToAdd;

  if (itemToAdd.menuCategory) {
    if (!store.order[activeDiner]?.orderedItems) {
      store.order[activeDiner] = {
        twoItemsAdded: false,
        mainsAdded: false,
        orderedItems: [],
      };
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

    store.order[activeDiner].orderedItems.push({
      menuItemId,
      menuItemName,
      menuItemPrice,
      menuCategory,
    });

    if (!store.order[activeDiner].mainsAdded) {
      store.order[activeDiner].mainsAdded = itemToAdd.menuCategory === "mains";
    }
    store.order[activeDiner].twoItemsAdded =
      store.order[activeDiner].orderedItems.length >= 2;

    return store;
  }
};

export default addItemToOrder;
