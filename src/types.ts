import { MenuItemType } from "./components/Menu/components/MenuCategory";

export enum Diners {
  diner1 = "diner 1",
  diner2 = "diner 2",
}

export interface OrderedItemType {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface Order {
  [key: string]: {
    twoItemsAdded: boolean;
    mainsAdded: boolean;
    orderedItems: Array<OrderedItemType>;
  };
}

export interface Store {
  order: Order;
  activeDiner: string;
  error?: string;
}

export interface UnsplashResponse {
  results: Array<{
    urls: {
      thumb: string;
    };
  }>;
}

//#region action payload types

export interface ItemToAdd {
  menuItem: MenuItemType;
  menuCategory: string;
}

export interface ItemToRemove {
  id: number;
}

export interface ChangeActiveDiner {
  activeDiner: Diners;
}

export interface UpdateErrorState {
  error: string;
}

export type PayloadTypes =
  | ItemToAdd
  | ItemToRemove
  | ChangeActiveDiner
  | UpdateErrorState;

//#endregion

//#region action types

interface ActionType {
  type: string;
}

export interface AddDishToOrderActionType extends ActionType {
  payload: ItemToAdd;
}

export interface RemoveDishFromOrderActionType extends ActionType {
  payload: ItemToRemove;
}

export interface ChangeActiveDinerActionType extends ActionType {
  payload: ChangeActiveDiner;
}

export interface UpdateErrorStateActionType extends ActionType {
  payload: UpdateErrorState;
}

export type ActionTypes =
  | AddDishToOrderActionType
  | RemoveDishFromOrderActionType
  | ChangeActiveDinerActionType
  | UpdateErrorStateActionType;

//#endregion
