import React from "react";
import { render } from "react-dom";

import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu";

import styled from "styled-components";
import Menu from "./components/Menu";

export const theme = {
  colors: {
    primary: "#B8222D",
    primaryText: "#000",
    seperator: "#D8D8D8"
  },
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
