import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ThemeProvider } from "styled-components";
import globalTheme from "../globalTheme";
import rootReducer from "../reducers";
import { intialStore } from "../store";
import { Store } from "../types";

interface MockedAppRootOptions {
  mockStore: Store;
}

const mockedAppRoot = (
  ComponentTree: JSX.Element,
  options?: MockedAppRootOptions,
): RenderResult => {
  const AppContainer: React.FC = ({ children }) => (
    <Provider
      store={createStore(rootReducer, options?.mockStore || intialStore)}
    >
      <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>
    </Provider>
  );

  return render(ComponentTree, { wrapper: AppContainer });
};

export default mockedAppRoot;
