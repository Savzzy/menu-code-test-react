import React from "react";
import Total from "./Total";
import mockedAppRoot from "../../../__test-utils__/mockedAppRoot";
import {
  mockStore,
  BillAmount,
  zeroOrderStore,
} from "../__meta__/Order.fixtures";

describe("Total", () => {
  it("rendered correctly", () => {
    const { container } = mockedAppRoot(<Total />, {
      mockStore,
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders total bill amount correctly when both diner orders are passed", () => {
    const { getByText } = mockedAppRoot(<Total />, {
      mockStore,
    });

    expect(getByText(BillAmount)).toBeInTheDocument();
  });

  it("does not render if no orders placed", () => {
    const { queryByText } = mockedAppRoot(<Total />, {
      mockStore: zeroOrderStore,
    });

    expect(queryByText("Order Total")).not.toBeInTheDocument();
  });
});
