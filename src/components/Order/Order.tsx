import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeActiveDiner } from "../../actions";
import { Diners, Store } from "../../types";
import Tabs, { TabPositions } from "../Tabs";
import OrderedItem from "./components/OrderedItem";
import Total from "./components/Total";

const OrderContainer = styled.div`
  padding: 0 15px;
  min-width: 25%;
`;

const OrderedItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderButton = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.lightText};
  font-size: 20px;
  font-weight: 400;
  padding: 10px;
  border-radius: 5px;
  margin: 20px 10px;
`;

const OrderDetailsContainer = styled.div``;

const Order: React.FC = () => {
  const dispatch = useDispatch();

  const { activeDiner, orderedItems } = useSelector((store: Store) => {
    return {
      activeDiner: store.activeDiner,
      orderedItems: store.order[store.activeDiner] || [],
    };
  });

  const itemOrdered = useSelector((store: Store) => {
    let anItemHasBeenAdded = false;

    Object.keys(store.order).some((key: string) => {
      if (store.order[key].length > 0) {
        anItemHasBeenAdded = true;
        return true;
      }
    });

    return anItemHasBeenAdded;
  });

  const getDiner = (activeDiner: string) => {
    const dinerKey: string = Object.keys(Diners).find((key: string) => {
      return Diners[key] === activeDiner;
    });

    return Diners[dinerKey];
  };

  const onTabClick = (tabOption: string) => {
    dispatch(changeActiveDiner(getDiner(tabOption)));
  };

  const placeOrder = () => {};

  return (
    <OrderContainer>
      <Tabs
        tabOptions={Object.values(Diners)}
        selected={getDiner(activeDiner)}
        onTabClick={onTabClick}
        justifyContent={TabPositions.center}
      />
      <OrderDetailsContainer>
        <OrderedItems>
          {orderedItems.map((orderedItem) => {
            return (
              <OrderedItem
                key={orderedItem.menuItemId}
                itemId={orderedItem.menuItemId}
                itemName={orderedItem.menuItemName}
                itemCategory={orderedItem.menuCategory}
                itemPrice={orderedItem.menuItemPrice}
                priceUnit={"£"}
              />
            );
          })}
        </OrderedItems>
        <Total />
        {itemOrdered && (
          <OrderButton onClick={placeOrder}>Place Order</OrderButton>
        )}
      </OrderDetailsContainer>
    </OrderContainer>
  );
};

export default Order;
