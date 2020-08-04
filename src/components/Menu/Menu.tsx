import React, { useRef, useState } from "react";
import styled from "styled-components";
import menu from "../../../menu-data.json";
import Tabs from "../Tabs/Tabs";
import MenuCategory from "./components/MenuCategory";

const MenuContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: ${(props) => props.theme.colors.seperator};
`;

const MenuCategories = styled.div``;

const Menu: React.FC = () => {
  const categoryOffsets = useRef({});

  const getMenuCategories = (): Array<string> => {
    return Object.keys(menu);
  };

  const menuCategories = getMenuCategories();

  const [selectedTab, setSelectedTab] = useState<string>(menuCategories[0]);

  const onTabClick = (tabOption: string) => {
    setSelectedTab(tabOption);

    window.scrollTo(0, categoryOffsets.current[tabOption] - 10);
  };

  const registerOffset = (menuCategory: string, offsetY: number) => {
    categoryOffsets.current[menuCategory] = offsetY;
  };

  return (
    <MenuContainer>
      <Tabs
        tabOptions={menuCategories}
        selected={selectedTab}
        onTabClick={onTabClick}
      />
      <MenuCategories>
        {Object.keys(menu).map((menuCategory: string) => {
          return (
            <MenuCategory
              key={menuCategory}
              menuCategory={menuCategory}
              menuItems={menu[menuCategory]}
              registerOffset={registerOffset}
            />
          );
        })}
      </MenuCategories>
    </MenuContainer>
  );
};

export default Menu;
