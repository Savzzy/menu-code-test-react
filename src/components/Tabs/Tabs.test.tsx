import React from "react";
import mockedAppRoot from "../../__test-utils__/mockedAppRoot";
import Tabs from "./Tabs";
import { fireEvent } from "@testing-library/react";

describe("Tabs", () => {
  it("renders Tab component correctly", () => {
    const myMock = jest.fn();
    const { container } = mockedAppRoot(
      <Tabs
        tabOptions={["mains", "desserts", "starters"]}
        selected={"mains"}
        onTabClick={myMock}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("functions properly when selected Tab Clicked", () => {
    const myMock = jest.fn();
    const { getByTestId } = mockedAppRoot(
      <Tabs
        tabOptions={["mains", "desserts", "starters"]}
        selected={"mains"}
        onTabClick={myMock}
      />,
    );
    fireEvent.click(getByTestId("mains"));
    expect(myMock.mock.calls.length).toBe(1);
    expect(myMock.mock.calls[0][0]).toBe("mains");
  });
});
