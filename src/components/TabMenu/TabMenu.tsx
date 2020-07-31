import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  border-bottom-color: ${(props) => props.theme.colors.seperator};
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

interface TabProps {
    key: string;
    selected?: boolean;
}

const Tab = styled.div<TabProps>`
  text-align: center;
  padding: 20px;
  font-size: 20px;
  text-transform: capitalize;
  cursor: pointer;
  border-bottom-color: ${(props) => props.theme.colors.primary};
  border-bottom-width: 4px;
  border-bottom-style: ${(props) => props.selected ? 'solid' : 'none'};
`;

interface TabProps {
  tabOptions: Array<string>;
}

const TabMenu: React.FC<TabProps> = ({ tabOptions }) => {
  return (
    <TabContainer>
      {tabOptions.map((tabOption: string) => {
        return <Tab key={tabOption}>{tabOption}</Tab>;
      })}
    </TabContainer>
  );
};

export default TabMenu;
