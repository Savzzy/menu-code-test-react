import React from "react";
import Order from "./Order";

import mockedAppRoot from "../../__test-utils__/mockedAppRoot";

import { mockStore, zeroOrderStore } from "./__meta__/Order.fixtures";
import { MenuItemType } from "../Menu/components/MenuCategory";

describe("Order", () => {
  it("renders correctly", () => {
    const { container } = mockedAppRoot(<Order />, {
      mockStore,
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders all the ordered menu items for the active diner", () => {
    const { queryByText } = mockedAppRoot(<Order />, {
      mockStore,
    });

    mockStore.order[mockStore.activeDiner].orderedItems.forEach(
      (menuItem: MenuItemType) => {
        expect(queryByText(menuItem.name)).toBeInTheDocument();
        expect(
          queryByText(`£ ${menuItem.price.toFixed(2)}`),
        ).toBeInTheDocument();
      },
    );
  });

  describe("Complete order button", () => {
    it("renders when there is at least one ordered item", () => {
      const { getByText } = mockedAppRoot(<Order />, {
        mockStore,
      });

      expect(getByText("Place Order")).toBeInTheDocument();
    });

    it("does not render when there isn't at least one ordered item", () => {
      const { queryByText } = mockedAppRoot(<Order />, {
        mockStore: zeroOrderStore,
      });

      expect(queryByText("Place Order")).not.toBeInTheDocument();
    });
  });
});
