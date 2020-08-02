import { UI_ERRORS } from "../constants";
import { Order, OrderedItemType, Store } from "../types";
import { isObjectLiteralExpression } from "typescript";
import OrderedItem from "../components/Order/components/OrderedItem";

export const isDuplicateItem = (menuItemId: number, store: Store): boolean => {
  let isDuplicate = false;

  const activeDiner = store.activeDiner;

  store.order[activeDiner].orderedItems.some((orderedItem: OrderedItemType) => {
    if (orderedItem.menuItemId === menuItemId) {
      isDuplicate = true;
      return true;
    }
  });

  return isDuplicate;
};

export const checkForErrors = (store: Store): string => {
  let errorMessage: string = null;

  if (Object.keys(store.order).length < 2) {
    errorMessage = UI_ERRORS.SHOULD_ORDER_FOR_TWO;

    return errorMessage;
  }

  Object.keys(store.order).some((diner: string) => {
    const order = store.order[diner];

    if (!order.mainsAdded) {
      errorMessage = UI_ERRORS.SHOULD_HAVE_MAINS.replace("<diner>", diner);
      return true;
    }

    if (!order.twoItemsAdded) {
      errorMessage = UI_ERRORS.SHOULD_HAVE_TWO_ITEMS.replace("<diner>", diner);
      return true;
    }
  });

  return errorMessage;
};

export const isCheeseCakePresent = (
  menuItemName: string,
  store: Store,
): boolean => {
  let cheeseCakeFound = false;

  if (menuItemName === "Cheesecake") {
    Object.keys(store.order).some((diner: string) => {
      const order = store.order[diner];

      cheeseCakeFound = order.orderedItems.some(
        (OrderedItem: OrderedItemType) =>
          OrderedItem.menuItemName === "Cheesecake",
      );

      if (cheeseCakeFound) {
        return true;
      }
    });
  }

  return cheeseCakeFound;
};

export const waiterCriteriaCheck = (menuItemName: string, store: Store) => {
  let isWaiterUnhappy = false;
  if (menuItemName === "Prawn cocktail") {
    isWaiterUnhappy = store.order[store.activeDiner].orderedItems.some(
      (orderedItem: OrderedItemType) => {
        return orderedItem.menuItemName === "Salmon fillet";
      },
    );

    if (isWaiterUnhappy) {
      return true;
    }
  }
  if (menuItemName === "Salmon fillet") {
    isWaiterUnhappy = store.order[store.activeDiner].orderedItems.some(
      (orderedItem: OrderedItemType) => {
        return orderedItem.menuItemName === "Prawn cocktail";
      },
    );
    if (isWaiterUnhappy) {
      return true;
    }
  }
  return isWaiterUnhappy;
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

  if (isCheeseCakePresent(menuItemName, store)) {
    return {
      canBeAdded: false,
      error: UI_ERRORS.NO_MORE_CHEESECAKE,
    };
  }

  if (waiterCriteriaCheck(menuItemName, store)) {
    return {
      canBeAdded: false,
      error: UI_ERRORS.WAITER_RESTRICTION,
    };
  }

  return {
    canBeAdded: true,
  };
};
