import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Order, OrderedItemType, Store } from "../../../types";

const TotalContainer = styled.div`
  border-color: ${(props) => props.theme.colors.seperator};
  border-width: 1px;
  border-top-style: solid;
  border-bottom-style: solid;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 25px;
  padding: 15px 5px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 10px 0;
`;

const DinerTotalLabel = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.colors.secondaryText};
  font-weight: 400;
  text-transform: capitalize;
`;

const DinerTotalPrice = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.secondaryText};
  font-weight: 400;
`;

const TotalLabel = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primaryText};
  font-weight: 400;
`;

const OrderPrice = styled.div`
  font-size: 25px;
  color: ${(props) => props.theme.colors.primaryText};
  font-weight: 700;
`;

interface DinerTotalType {
  [key: string]: number;
}

const Total: React.FC = () => {
  const orderedItems = useSelector((store: Store) => {
    return store.order;
  });

  const calculateTotal = (
    order: Order,
  ): { dinerTotals: DinerTotalType; orderTotal: number } => {
    const dinerTotals = {};
    let orderTotal = 0;

    Object.keys(order).forEach((key: string) => {
      dinerTotals[key] = 0;

      order[key].orderedItems.forEach((item: OrderedItemType) => {
        dinerTotals[key] += item.price;
      });

      orderTotal += dinerTotals[key];
    });

    return {
      dinerTotals,
      orderTotal,
    };
  };

  const { dinerTotals, orderTotal } = calculateTotal(orderedItems);

  if (orderTotal === 0) {
    return null;
  }

  return (
    <TotalContainer>
      {Object.keys(dinerTotals).map((diner: string) => {
        const dinerTotal = dinerTotals[diner];

        if (dinerTotal === 0) {
          return null;
        }

        return (
          <PriceRow key={diner}>
            <DinerTotalLabel>{diner}</DinerTotalLabel>
            <DinerTotalPrice>{`£ ${dinerTotal.toFixed(2)}`}</DinerTotalPrice>
          </PriceRow>
        );
      })}
      <PriceRow>
        <TotalLabel>Order Total</TotalLabel>
        <OrderPrice>{`£ ${orderTotal.toFixed(2)}`}</OrderPrice>
      </PriceRow>
    </TotalContainer>
  );
};

export default Total;
