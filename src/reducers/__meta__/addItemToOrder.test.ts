import addItemToOrder from "../addItemToOrder";
import { mockStore, soup, Pâté } from "./reducers.fixtures";
import { cloneObject } from "../../__test-utils__/cloneObject";
import { ACTION_TYPES } from "../../constants";
import rootReducer from "..";
import { Store } from "../../types";

describe("addItemToOrder", () => {
  it("should add the item passed to the store", () => {
    const mockClonedStore = cloneObject<Store>(mockStore);
    const modifiedStore = addItemToOrder(mockClonedStore, {
      menuItem: {
        id: soup.id,
        name: soup.name,
        price: soup.price,
      },
      menuCategory: soup.category,
    });

    expect(
      modifiedStore.order[modifiedStore.activeDiner].orderedItems.length,
    ).toBe(3);
  });
});
