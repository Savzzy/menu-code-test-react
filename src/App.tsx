import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import Error from "./components/Error/Error";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Order from "./components/Order/Order";
import globalTheme from "./globalTheme";
import { store } from "./store";

export const breakpoints = {
  mobile: "560px",
  desktop: "800px",
};

const AppContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  @media (min-width: 950px) {
    display: flex;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <AppContainer>
        <Header />
        <ContentContainer>
          <Menu />
          <Order />
        </ContentContainer>
        <Error />
      </AppContainer>
    </ThemeProvider>
  );
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
