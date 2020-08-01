import React from "react";
import styled, { useTheme } from "styled-components";
import { RemoveIcon } from "../../Icons";

import { connect, useDispatch } from "react-redux";
import { removeItemFromOrder } from "../../../actions";

const OrderedItemContainer = styled.div`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.itemCardBorder};
  border-style: solid;
  display: flex;
  height: 70px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 10px 0;
  position: relative;
`;

const ImageContainer = styled.div`
  background: url("https://img.taste.com.au/_YKHzE3u/taste/2016/11/pumpkin-and-chive-soup-75984-1.jpeg");
  height: 70px;
  width: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 5px 0 0 5px;
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
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

const IconContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 5px;
`;

interface OrderedItemProps {
  itemId: number;
  itemName: string;
  itemCategory: string;
  itemPrice: number;
  priceUnit: string;
}

const OrderedItem: React.FC<OrderedItemProps> = ({
  itemId,
  itemName,
  itemCategory,
  itemPrice,
  priceUnit,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <OrderedItemContainer>
      <ImageContainer />
      <ItemDetailsContainer>
        <ItemName>{itemName}</ItemName>
        <ItemPrice>{`${priceUnit} ${itemPrice.toFixed(2)}`}</ItemPrice>
      </ItemDetailsContainer>
      <Category>{itemCategory}</Category>
      <IconContainer
        onClick={() => {
          dispatch(removeItemFromOrder(itemId));
        }}
      >
        <RemoveIcon color={theme.colors.primary} size={10} />
      </IconContainer>
    </OrderedItemContainer>
  );
};

export default connect()(OrderedItem);
