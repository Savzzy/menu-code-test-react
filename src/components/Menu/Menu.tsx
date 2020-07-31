import React, { useState } from "react";
import styled from "styled-components";
import menu from "../../../menu-data.json";
import Tabs from "../Tabs/Tabs";
import MenuItem from "./components/MenuItem";

interface MenuItemType {
  id: number;
  name: string;
  price: number;
}

interface MenuCategoryType {
  [key: string]: Array<MenuItemType>;
}

const MenuContainer = styled.div`
  width: 100%;
  padding-left: 50px;
`;

const MenuCategories = styled.div``;

const MenuCategory = styled.div``;

const CategoryName = styled.h2`
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 20px;
  margin: 25px 0 20px 20px;
  text-transform: capitalize;
  font-weight: 400;
`;

const Menu: React.FC = () => {
  const getMenuCategories = (): Array<string> => {
    return Object.keys(menu);
  };

  const menuCategories = getMenuCategories();

  const [selectedTab, setSelectedTab] = useState<string>(menuCategories[0]);

  const onTabClick = (tabOption: string) => {
    setSelectedTab(tabOption);
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
            <MenuCategory>
              <CategoryName>{menuCategory}</CategoryName>
              {Object.values(menu[menuCategory]).map(
                (menuItem: MenuItemType) => {
                  return (
                    <MenuItem
                      itemId={menuItem.id}
                      itemName={menuItem.name}
                      itemPrice={menuItem.price}
                      priceUnit="£"
                    />
                  );
                },
              )}
            </MenuCategory>
          );
        })}
      </MenuCategories>
    </MenuContainer>
  );
};

export default Menu;
