import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  changeActiveDiner,
  updateErrorState,
  removeItemFromOrder,
} from "../../actions";
import { Diners, OrderedItemType, Store } from "../../types";
import { checkForErrors } from "../../util/ruleSets";
import { MenuItemType } from "../Menu/components/MenuCategory";
import MenuItem from "../Menu/components/MenuItem";
import Tabs, { TabPositions } from "../Tabs";
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
  cursor: pointer;
`;

const OrderDetailsContainer = styled.div``;

const Order: React.FC = () => {
  const dispatch = useDispatch();

  const onDeleteIconClick = (menuItemID: number) => {
    dispatch(removeItemFromOrder(menuItemID));
  };

  const { activeDiner, orderedItems, store, itemOrdered } = useSelector(
    (store: Store) => {
      let itemOrdered = false;
      Object.keys(store.order).some((key: string) => {
        if (store.order[key].orderedItems.length > 0) {
          itemOrdered = true;
          return true;
        }
      });

      return {
        activeDiner: store.activeDiner,
        orderedItems: store.order[store.activeDiner]?.orderedItems || [],
        itemOrdered,
        store,
      };
    },
  );

  const getDiner = (activeDiner: string) => {
    const dinerKey: string = Object.keys(Diners).find((key: string) => {
      return Diners[key] === activeDiner;
    });

    return Diners[dinerKey];
  };

  const onTabClick = (tabOption: string) => {
    dispatch(changeActiveDiner(getDiner(tabOption)));
  };

  const placeOrder = () => {
    const error = checkForErrors(store);

    if (error) {
      dispatch(updateErrorState(error));
    }
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
          {orderedItems.map((item: OrderedItemType) => {
            const menuItem: MenuItemType = {
              id: item.id,
              name: item.name,
              price: item.price,
            };

            return (
              <MenuItem
                key={menuItem.id}
                menuItem={menuItem}
                priceUnit={"£"}
                itemCategory={item.category}
                ordered={true}
                onDeleteIconClick={onDeleteIconClick}
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
