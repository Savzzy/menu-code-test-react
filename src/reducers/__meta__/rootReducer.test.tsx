import { cloneObject } from "../../__test-utils__/cloneObject";
import {
  Store,
  ActionTypes,
  ItemToAdd,
  AddDishToOrderActionType,
  OrderedItemType,
  RemoveDishFromOrderActionType,
  ChangeActiveDiner,
  ChangeActiveDinerActionType,
  Diners,
  UpdateErrorStateActionType,
  ResetStoreActionType,
} from "../../types";
import { mockStore, mockStoreWithNoOrders } from "./reducers.fixtures";
import rootReducer from "..";
import { ACTION_TYPES, UI_ERRORS } from "../../constants";

describe("reducer", () => {
  it("ADD_DISH action adds selected menu item to the store", () => {
    const mockAddItemAction: AddDishToOrderActionType = {
      type: ACTION_TYPES.ADD_DISH,
      payload: {
        menuCategory: "mains",
        menuItem: {
          id: 1,
          name: "test",
          price: 1,
        },
      },
    };

    const modifiedStore = rootReducer(mockStoreWithNoOrders, mockAddItemAction);

    expect(
      modifiedStore.order[modifiedStore.activeDiner].orderedItems.length,
    ).toBe(1);
  });

  it("REMOVE_DISH action removes selected menu item from the store", () => {
    const orderedMenuItem: OrderedItemType =
      mockStore.order[mockStore.activeDiner].orderedItems[0];

    const mockRemoveItemAction: RemoveDishFromOrderActionType = {
      type: ACTION_TYPES.REMOVE_DISH,
      payload: {
        id: orderedMenuItem.id,
      },
    };

    const modifiedStore = rootReducer(mockStore, mockRemoveItemAction);

    expect(
      modifiedStore.order[modifiedStore.activeDiner].orderedItems.length,
    ).toBe(1);
  });

  it("CHANGE_ACTIVE_DINER action, changes the active dinner in the store", () => {
    const mockChangeActiveDinerAction: ChangeActiveDinerActionType = {
      type: ACTION_TYPES.CHANGE_ACTIVE_DINER,
      payload: {
        activeDiner: Diners.diner2,
      },
    };

    const modifiedStore = rootReducer(mockStore, mockChangeActiveDinerAction);
    expect(modifiedStore.activeDiner).toBe(Diners.diner2);
  });

  it("UPDATE_ERROR action, adds or updates error key in the store", () => {
    const updateErrorAction: UpdateErrorStateActionType = {
      type: ACTION_TYPES.UPDATE_ERROR,
      payload: {
        error: UI_ERRORS.DUPLICATE_ORDER_ITEM,
      },
    };

    const modifiedStore = rootReducer(mockStore, updateErrorAction);
    expect(modifiedStore.error).toBe(UI_ERRORS.DUPLICATE_ORDER_ITEM);
  });

  it("RESET_STORE action, resets the store to passed store value", () => {
    const resetStoreAction: ResetStoreActionType = {
      type: ACTION_TYPES.RESET_STORE,
      payload: mockStoreWithNoOrders,
    };

    const modifiedStore = rootReducer(mockStore, resetStoreAction);
    expect(modifiedStore).toBe(mockStoreWithNoOrders);
  });
});
