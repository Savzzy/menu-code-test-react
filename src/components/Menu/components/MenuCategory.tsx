import equal from "fast-deep-equal";
import React, { useEffect, useRef } from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addItemToOrder } from "../../../actions";
import MenuItem from "./MenuItem";

const CategoryName = styled.h2`
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 20px;
  margin: 25px 0 20px 20px;
  text-transform: capitalize;
  font-weight: 400;
`;

const MenuItemsContainer = styled(Grid)``;

export interface MenuItemType {
  id: number;
  name: string;
  price: number;
}

interface MenuCategoryProps {
  menuCategory: string;
  menuItems: Array<MenuItemType>;
  registerOffset?: (menuCategory: string, offsetY: number) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  menuCategory,
  menuItems,
  registerOffset,
}) => {
  const categoryName = useRef(null);

  useEffect(() => {
    if (categoryName?.current && registerOffset) {
      registerOffset(
        menuCategory,
        categoryName.current.getBoundingClientRect().y,
      );
    }
  });

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <CategoryName ref={categoryName}>{menuCategory}</CategoryName>
      <MenuItemsContainer fluid>
        <Row>
          {menuItems.map((menuItem: MenuItemType) => {
            return (
              <Col xs={12} sm={6} md={4} key={menuItem.id}>
                <MenuItem
                  key={menuItem.id}
                  menuItem={menuItem}
                  priceUnit="£"
                  onClick={(menuItem: MenuItemType) => {
                    dispatch(addItemToOrder(menuItem, menuCategory));
                  }}
                />
              </Col>
            );
          })}
        </Row>
      </MenuItemsContainer>
    </React.Fragment>
  );
};

export default React.memo(MenuCategory, (prevProps, nextProps) => {
  return !equal(prevProps, nextProps);
});
