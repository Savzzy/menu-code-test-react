import React from "react";
import Order from "./Order";
import { useSelector } from "react-redux";

import mockedAppRoot from "../../__test-utils__/mockedAppRoot";
import { mockStore } from "../../util/__meta__/ruleSets.fixtures";
import { mockStoreWithWrongOrder } from "./__meta__/Order.fixtures";
import { MenuItemType } from "../Menu/components/MenuCategory";
import { fireEvent } from "@testing-library/react";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Order", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((getStoreValues) => {
      return getStoreValues(mockStore);
    });
  });
  it("renders correctly", () => {
    const { container } = mockedAppRoot(<Order />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders all the ordered menu items for the active diner", () => {
    const { queryByText } = mockedAppRoot(<Order />);

    mockStore.order[mockStore.activeDiner].orderedItems.forEach(
      (menuItem: MenuItemType) => {
        expect(queryByText(menuItem.name)).toBeInTheDocument();
        expect(
          queryByText(`£ ${menuItem.price.toFixed(2)}`),
        ).toBeInTheDocument();
      },
    );
  });
});

describe("Negative scenario: Order", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((getStoreValues) => {
      return getStoreValues(mockStoreWithWrongOrder);
    });
  });

  it("renders error when cheesecake is ordered twice", () => {
    const { getByText, getByTestId } = mockedAppRoot(<Order />);
    fireEvent.click(getByTestId("place-order"));
    expect(
      getByText("Sorry, You cannot add Prawn cocktail with Salmon fillet"),
    ).toBeInTheDocument();
    // expect(getByText("Salmon fillet")).toBeInTheDocument();
    // expect(getByText("Prawn cocktail")).not.toBeInTheDocument();
  });
});
