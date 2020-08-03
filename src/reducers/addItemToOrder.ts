import { ItemToAdd, PayloadTypes, Store } from "../types";
import { canItemBeAdded } from "../util/ruleSets";

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

    const { menuItem, menuCategory } = payload as ItemToAdd;

    const { canBeAdded, error } = canItemBeAdded(
      menuItem.id,
      menuItem.name,
      store,
    );

    if (!canBeAdded) {
      store.error = error;
      return store;
    }

    store.order[activeDiner].orderedItems.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      category: menuCategory,
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
