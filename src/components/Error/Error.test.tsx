import React from "react";
import Error from "./Error";
import mockedAppRoot from "../../__test-utils__/mockedAppRoot";
import { mockStore } from "../Order/__meta__/Order.fixtures";
import useSelector from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Error component", () => {
  beforeEach(() => {
    ((useSelector as unknown) as jest.Mock).mockImplementation(
      (getStoreValues) => {
        return getStoreValues(mockStore);
      },
    );
  });

  it("renders correctly", () => {
    const { container } = mockedAppRoot(<Error />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the error ", () => {
    const { container } = mockedAppRoot(<Error />);
  });
});
