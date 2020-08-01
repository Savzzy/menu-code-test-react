import { ACTION_TYPES } from "../constants";
import { ActionTypes, Diners } from "../types";

export const addItemToOrder = (
  menuItemId: number,
  menuItemName: string,
  menuItemPrice: number,
  menuCategory: string,
): ActionTypes => {
  return {
    type: ACTION_TYPES.ADD_DISH,
    payload: {
      menuItemId,
      menuItemName,
      menuItemPrice,
      menuCategory,
    },
  };
};

export const removeItemFromOrder = (menuItemId: number): ActionTypes => {
  return {
    type: ACTION_TYPES.REMOVE_DISH,
    payload: {
      menuItemId,
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
