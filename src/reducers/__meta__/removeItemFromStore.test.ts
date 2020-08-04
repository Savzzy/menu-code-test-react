import removeItemFromOrder from "../removeItemFromOrder";
import { mockStore } from "./reducers.fixtures";
import rootReducer from "..";
import { ACTION_TYPES } from "../../constants";
import { Store } from "../../types";
import { cloneObject } from "../../__test-utils__/cloneObject";

describe("removeItemFromOrder", () => {
  it("test if order is removed from the store", () => {
    const payload = {
      id: 7,
    };

    const mockClonedStore = cloneObject<Store>(mockStore);
    removeItemFromOrder(mockClonedStore, payload);

    expect(
      mockClonedStore.order[mockClonedStore.activeDiner].orderedItems.length,
    ).toBe(1);
  });
});
