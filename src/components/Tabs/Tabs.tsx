import React from "react";
import styled from "styled-components";

export enum TabPositions {
  center = "center",
  flexStart = "flex-start",
  flexEnd = "flex-end",
}

interface TabContainerProps {
  justifyContent?: TabPositions;
}

const TabContainer = styled.div<TabContainerProps>`
  width: 100%;
  margin-right: 15px;
  display: flex;
  border-bottom-color: ${(props) => props.theme.colors.seperator};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
`;

interface TabProps {
  selected?: boolean;
}

const Tab = styled.div<TabProps>`
  text-align: center;
  padding: 20px;
  font-size: 20px;
  text-transform: capitalize;
  cursor: pointer;
  border-bottom-color: ${(props) =>
    props.selected ? props.theme.colors.primary : props.theme.colors.white};
  border-bottom-width: 4px;
  border-bottom-style: solid;
  transition: border-bottom-color 0.25s;
`;

interface TabsProps extends TabContainerProps {
  tabOptions: Array<string>;
  selected: string;
  onTabClick: (tabOption: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabOptions,
  selected,
  onTabClick,
  justifyContent,
}) => {
  return (
    <TabContainer justifyContent={justifyContent}>
      {tabOptions.map((tabOption: string) => {
        return (
          <Tab
            key={tabOption}
            selected={tabOption === selected}
            onClick={() => {
              onTabClick(tabOption);
            }}
            data-testid={tabOption}
          >
            {tabOption}
          </Tab>
        );
      })}
    </TabContainer>
  );
};

export default Tabs;
