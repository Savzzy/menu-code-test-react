import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import unsplash from "../../../api/unsplash";
import { MenuItemType } from "./MenuCategory";
import { DefaultMenuItemIcon, RemoveIcon } from "../../Icons";
import { UnsplashResponse } from "../../../types";
import { useDispatch } from "react-redux";
import { removeItemFromOrder } from "../../../actions";

const MenuItemContainer = styled.div`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.itemCardBorder};
  border-style: solid;
  display: flex;
  height: 90px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  position: relative;
`;

interface ImageContainerProps {
  imageUrl?: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  background: url(${(props) => props.imageUrl});
  height: 90px;
  width: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px 0 0 5px;

  display: flex;
  justify-content: center;
  align-items: center;
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

const IconContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 5px;
`;

const Category = styled.div`
  border-radius: 100px;
  padding: 0 10px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.lightText};

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 12px;
`;

interface MenuItemProps {
  menuItem: MenuItemType;
  priceUnit: string;
  onClick?: (menuItem: MenuItemType) => void;
  addedToOrder?: boolean;
  itemCategory?: string;
  ordered?: boolean;
  onDeleteIconClick?: (menuItemID: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  menuItem,
  priceUnit,
  onClick,
  itemCategory,
  ordered,
  onDeleteIconClick,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [imageUrl, setImageUrl] = useState<string>("unInitialised");

  useEffect(() => {
    async function fetchMenuItem() {
      try {
        const response = await unsplash.get<UnsplashResponse>("search/photos", {
          params: {
            query: menuItem.name,
            orientation: "squarish",
            per_page: 1,
          },
        });

        const imageUrl = response.data.results[0].urls.thumb;

        setImageUrl(imageUrl);
      } catch (error) {
        setImageUrl(null);
      }
    }

    fetchMenuItem();
  });

  const getMenuItemImage = () => {
    return (
      <ImageContainer imageUrl={imageUrl}>
        {!imageUrl && (
          <DefaultMenuItemIcon size={"70%"} color={theme.colors.primary} />
        )}
      </ImageContainer>
    );
  };

  return (
    <MenuItemContainer
      onClick={() => {
        onClick && onClick(menuItem);
      }}
    >
      {getMenuItemImage()}
      <ItemDetailsContainer>
        <ItemName>{menuItem.name}</ItemName>
        <ItemPrice>{`${priceUnit} ${menuItem.price.toFixed(2)}`}</ItemPrice>
      </ItemDetailsContainer>

      {ordered && (
        <React.Fragment>
          <Category>{itemCategory}</Category>
          <IconContainer
            onClick={() => {
              onDeleteIconClick && onDeleteIconClick(menuItem.id);
            }}
            data-testid="icon-container"
          >
            <RemoveIcon color={theme.colors.primary} size={10} />
          </IconContainer>
        </React.Fragment>
      )}
    </MenuItemContainer>
  );
};

export default MenuItem;
