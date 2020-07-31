import React from "react";
import styled from "styled-components";
import TabMenu from "../TabMenu/TabMenu";

import menu from "../../../menu-data.json";

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  padding-left: 50px;
`;

const Menu: React.FC = () => {
  const getMenuCategories = (): Array<string> => {
    return Object.keys(menu);
  };

  return (
    <MenuContainer>
      <TabMenu tabOptions={getMenuCategories()} />
    </MenuContainer>
  );
};

export default Menu;
