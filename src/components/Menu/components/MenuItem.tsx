import React, { useState, useEffect } from "react";
import styled from "styled-components";

import unsplash from "../../../api/unsplash";

const MenuItemContainer = styled.div`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.itemCardBorder};
  border-style: solid;
  max-width: 275px;
  display: flex;
  height: 90px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
  margin: 20px;
  border-radius: 5px;
`;

const ImageContainer = styled.div`
  background: url("https://img.taste.com.au/_YKHzE3u/taste/2016/11/pumpkin-and-chive-soup-75984-1.jpeg");
  height: 90px;
  width: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px 0 0 5px;
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ItemName = styled.h2`
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  font-weight: 400;
  flex-grow: 1;
`;

const ItemPrice = styled.h3`
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 16px;
  margin: 0;
  font-weight: 400;
`;

interface MenuItemProps {
  itemId: number;
  itemName: string;
  itemPrice: number;
  priceUnit: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  itemId,
  itemName,
  itemPrice,
  priceUnit,
}) => {
  const [menuItemImage, setMenuItemImage] = useState(null);

  useEffect(() => {
    async function fetchMenuItem() {
      try {
        const response = await unsplash.get("search/photos", {
          params: { query: "cats" },
        });

        // debugger;
      } catch (error) {
        console.log("unsplash API error");
      }
    }

    fetchMenuItem();
  });

  return (
    <MenuItemContainer>
      <ImageContainer />
      <ItemDetailsContainer>
        <ItemName>{itemName}</ItemName>
        <ItemPrice>{`${priceUnit} ${itemPrice.toFixed(2)}`}</ItemPrice>
      </ItemDetailsContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
