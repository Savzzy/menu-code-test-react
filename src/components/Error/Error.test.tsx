import React from "react";
import Error from "./Error";
import mockedAppRoot from "../../__test-utils__/mockedAppRoot";
import { mockStore } from "./Error.fixture";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => {
    return mockStore.error;
  },
}));

describe("Error component", () => {
  it("renders correctly", () => {
    const { container } = mockedAppRoot(<Error />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("shows the error present in store", () => {
    const { getByText } = mockedAppRoot(<Error />);

    expect(getByText(mockStore.error)).toBeInTheDocument();
  });
});
