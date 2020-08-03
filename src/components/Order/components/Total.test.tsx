import React from "react";
import Total from "./Total";
import mockedAppRoot from "../../../__test-utils__/mockedAppRoot";
import { useSelector } from "react-redux";
import {
  mockStore,
  BillAmount,
  mockStoreForNoOrders,
} from "../__meta__/Order.fixtures";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Total", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((getStoreValues) => {
      return getStoreValues(mockStore);
    });
  });

  afterEach(() => {
    (useSelector as jest.Mock).mockClear();
  });

  it("rendered correctly", () => {
    const { container } = mockedAppRoot(<Total />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renderes total bill amount correctly when both diner orders are passed", () => {
    const { getByText } = mockedAppRoot(<Total />);

    expect(getByText(BillAmount)).toBeInTheDocument();
  });
});

describe("Total", () => {
  it("doessn't doesn't render itelf if no orders placed", () => {
    (useSelector as jest.Mock).mockImplementation((getStoreValues) => {
      return getStoreValues(mockStoreForNoOrders);
    });

    const { queryByText } = mockedAppRoot(<Total />);

    expect(queryByText("Order Total")).not.toBeInTheDocument();
  });

  (useSelector as jest.Mock).mockClear();
});
