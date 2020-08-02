export enum ACTION_TYPES {
  ADD_DISH = "ADD_DISH",
  REMOVE_DISH = "REMOVE_DISH",
  CHANGE_ACTIVE_DINER = "CHANGE_ACTIVE_DINER",
  UPDATE_ERROR = "UPDATE_ERROR",
}

export const UI_ERRORS = {
  DUPLICATE_ORDER_ITEM: "You cannot order the same item more than once.",
  SHOULD_HAVE_MAINS: "<diner> should order at least one mains",
  SHOULD_HAVE_TWO_ITEMS: "<diner> should order at least two items",
  SHOULD_ORDER_FOR_TWO: "Please select items for both the diners",
  NO_MORE_CHEESECAKE: "Sorry, we have ran out of cheesecakes",
  WAITER_RESTRICTION: "Sorry, You cannot add Prawn cocktail with Salmon fillet",
};
