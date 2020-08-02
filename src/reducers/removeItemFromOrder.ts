import {
  Store,
  PayloadTypes,
  OrderedItemType,
  ItemToRemove,
  Diners,
} from "../types";

const removeItemFromOrder = (store: Store, payload: PayloadTypes) => {
  const activeDiner = store.activeDiner;

  store.order[activeDiner].orderedItems = store.order[
    activeDiner
  ].orderedItems.filter((orderedItem: OrderedItemType) => {
    return orderedItem.menuItemId !== (payload as ItemToRemove).menuItemId;
  });

  let hasMains = false;

  store.order[activeDiner].orderedItems.some((orderedItem: OrderedItemType) => {
    if (orderedItem.menuCategory === "mains") {
      hasMains = true;
      return true;
    }
  });

  store.order[activeDiner].mainsAdded = hasMains;
  store.order[activeDiner].twoItemsAdded =
    store.order[activeDiner].orderedItems.length >= 2;

  return store;
};

export default removeItemFromOrder;
