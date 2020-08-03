import React from "react";
import mockedAppRoot from "../../../__test-utils__/mockedAppRoot";
import MenuItem from "./MenuItem";
import { mockMenuItems } from "./MenuCategory.fixtures";
import { fireEvent } from "@testing-library/react";

describe("MenuItem", () => {
  it("renders correctly", () => {
    const { container } = mockedAppRoot(
      <MenuItem menuItem={mockMenuItems[0]} priceUnit="£" />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renderes passed menuItem name correctly", () => {
    const { getByText } = mockedAppRoot(
      <MenuItem menuItem={mockMenuItems[0]} priceUnit="£" />,
    );

    expect(getByText(mockMenuItems[0].name)).toBeInTheDocument();
  });

  it("test on menuItem Click", () => {
    const myMock = jest.fn();

    const { getByText } = mockedAppRoot(
      <MenuItem menuItem={mockMenuItems[0]} priceUnit="£" onClick={myMock} />,
    );

    fireEvent.click(getByText(mockMenuItems[0].name));

    expect(myMock.mock.calls.length).toBe(1);
    expect(myMock.mock.calls[0][0]).toBe(mockMenuItems[0]);

    myMock.mockClear();
  });

  it("renders delete icon when ordered props is true", () => {
    const { getByTestId } = mockedAppRoot(
      <MenuItem ordered={true} menuItem={mockMenuItems[0]} priceUnit="£" />,
    );
    expect(getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("deletes the menuItem when clicked on delete icon", () => {
    const myMock = jest.fn();
    const { getByTestId } = mockedAppRoot(
      <MenuItem
        ordered={true}
        menuItem={mockMenuItems[0]}
        priceUnit="£"
        onDeleteIconClick={myMock}
      />,
    );

    fireEvent.click(getByTestId("icon-container"));
    expect(myMock.mock.calls.length).toBe(1);
    expect(myMock.mock.calls[0][0]).toBe(mockMenuItems[0].id);

    myMock.mockClear();
  });
});
