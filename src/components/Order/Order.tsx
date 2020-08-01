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

const OrderDetailsContainer = styled.div``;

const Order: React.FC = () => {
  const dispatch = useDispatch();

  const { activeDiner, orderedItems } = useSelector((store: Store) => {
    return {
      activeDiner: store.activeDiner,
      orderedItems: store.order[store.activeDiner] || [],
    };
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
      </OrderDetailsContainer>
    </OrderContainer>
  );
};

export default Order;
