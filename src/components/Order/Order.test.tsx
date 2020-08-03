import React from "react";
import Order from "./Order";
import { useSelector } from "react-redux";

import mockedAppRoot from "../../__test-utils__/mockedAppRoot";
import { mockStore } from "../../util/__meta__/ruleSets.fixtures";

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

  //   it("should render menu item for active diner", () => {
  //     (useSelector as jest.Mock).mockImplementation((getStoreValues) => {
  //       return getStoreValues(mockStore);
  //     });

  //     const { queryByText } = mockedAppRoot(<Order />);
  //     expect(
  //       queryByText(mockStore.order[mockStore.activeDiner].orderedItems[1].name),
  //     ).toBeInTheDocument();
  //   });
});
