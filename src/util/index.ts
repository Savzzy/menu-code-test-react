import { Store, OrderedItemType, Order } from "../types";
import { UI_ERRORS } from "../constants";
import OrderedItem from "../components/Order/components/OrderedItem";

export const isDuplicateItem = (menuItemId: number, store: Store): boolean => {
  let isDuplicate = false;

  const activeDiner = store.activeDiner;

  store.order[activeDiner].some((orderedItem: OrderedItemType) => {
    if (orderedItem.menuItemId === menuItemId) {
      isDuplicate = true;
      return true;
    }
  });

  return isDuplicate;
};

export const orderHasMains = (order: Order) => {
  let orderHasMains = false;

  Object.keys((diner: string) => {
    order[diner].some((orderedItem: OrderedItemType) => {
      if (orderedItem.menuCategory === "mains") {
        orderHasMains = true;
        return true;
      }
    });
  });

  return orderHasMains;
};

export const isValidOrder = (store: Store) => {
  let isValidOrder = true;
};

export const canItemBeAdded = (
  menuItemId: number,
  menuItemName: string,
  store: Store,
) => {
  if (isDuplicateItem(menuItemId, store)) {
    return {
      canBeAdded: false,
      error: UI_ERRORS.DUPLICATE_ORDER_ITEM,
    };
  }

  return {
    canBeAdded: true,
  };
};
