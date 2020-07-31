import React from "react";
import styled from "styled-components";

import banner from "../../assets/banner.png";

const HeaderContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const RestaurantName = styled.h1`
  color: ${(props) => props.theme.colors.primaryText};
  font-weight: 400;
  margin-left: 25px;
`;

const RestaurantBannerImage = styled.div`
  background-image: url(${banner});
  width: 100%;
  height: 300px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <RestaurantName>Gustos</RestaurantName>
      <RestaurantBannerImage />
    </HeaderContainer>
  );
};

export default Header;
