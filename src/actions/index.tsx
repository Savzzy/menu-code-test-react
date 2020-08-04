import { ACTION_TYPES } from "../constants";
import { ActionTypes, Diners, Store } from "../types";
import { MenuItemType } from "../components/Menu/components/MenuCategory";

export const addItemToOrder = (
  menuItem: MenuItemType,
  menuCategory: string,
): ActionTypes => {
  return {
    type: ACTION_TYPES.ADD_DISH,
    payload: {
      menuItem,
      menuCategory,
    },
  };
};

export const removeItemFromOrder = (id: number): ActionTypes => {
  return {
    type: ACTION_TYPES.REMOVE_DISH,
    payload: {
      id,
    },
  };
};

export const changeActiveDiner = (activeDiner: Diners): ActionTypes => {
  return {
    type: ACTION_TYPES.CHANGE_ACTIVE_DINER,
    payload: {
      activeDiner,
    },
  };
};

export const updateErrorState = (error: string): ActionTypes => {
  return {
    type: ACTION_TYPES.UPDATE_ERROR,
    payload: {
      error,
    },
  };
};

export const resetStore = (store: Store): ActionTypes => {
  return {
    type: ACTION_TYPES.RESET_STORE,
    payload: store,
  };
};
