import React from "react";
import { render } from "react-dom";

import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Tabs from "./components/Tabs";

import styled from "styled-components";
import Menu from "./components/Menu";

export const theme = {
  colors: {
    primary: "#B8222D",
    primaryText: "#000",
    seperator: "#D8D8D8",
    white: "#FFF",
    itemCardBorder: "#F5F5F5",
  },
};

export const breakpoints = {
  mobile: "560px",
  desktop: "800px",
};

const AppContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <Menu />
      </AppContainer>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById("root"));
