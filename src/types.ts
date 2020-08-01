export enum Diners {
  diner1 = "diner 1",
  diner2 = "diner 2",
}

export interface OrderedItemType {
  menuItemId: number;
  menuItemName: string;
  menuItemPrice: number;
  menuCategory: string;
}

export interface Order {
  [key: string]: Array<OrderedItemType>;
}

export interface Store {
  order: Order;
  activeDiner: string;
}

//#region action payload types

export interface ItemToAdd {
  menuItemId: number;
  menuItemName: string;
  menuItemPrice: number;
  menuCategory: string;
}

export interface ItemToRemove {
  menuItemId: number;
}

export interface ChangeActiveDiner {
  activeDiner: Diners;
}

export type ActionTypes =
  | AddDishToOrderActionType
  | RemoveDishFromOrderActionType
  | ChangeActiveDinerActionType;

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

export type PayloadTypes = ItemToAdd | ItemToRemove | ChangeActiveDiner;

//#endregion
