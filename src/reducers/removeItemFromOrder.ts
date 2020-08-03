import { ItemToRemove, OrderedItemType, PayloadTypes, Store } from "../types";

const removeItemFromOrder = (store: Store, payload: PayloadTypes) => {
  const activeDiner = store.activeDiner;
  const activeDinersOrder = store.order[activeDiner];

  activeDinersOrder.orderedItems = store.order[activeDiner].orderedItems.filter(
    (orderedItem: OrderedItemType) => {
      return orderedItem.id !== (payload as ItemToRemove).id;
    },
  );

  let hasMains = false;

  activeDinersOrder.orderedItems.some((orderedItem: OrderedItemType) => {
    if (orderedItem.category === "mains") {
      hasMains = true;
      return true;
    }
  });

  if (activeDinersOrder.orderedItems.length === 0) {
    delete store.order[activeDiner];
  } else {
    activeDinersOrder.mainsAdded = hasMains;
    activeDinersOrder.twoItemsAdded =
      activeDinersOrder.orderedItems.length >= 2;
  }

  return store;
};

export default removeItemFromOrder;
