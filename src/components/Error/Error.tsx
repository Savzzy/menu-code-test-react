import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Store } from "../../types";
import { updateErrorState } from "../../actions";

const ErrorContainer = styled.div`
  width: fit-content;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  position: fixed;
  bottom: 1%;
  right: 1%;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.lightText};
  font-size: 20px;
  font-weight: 400;
`;

const Error: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((store: Store) => store.error);

  if (!error) {
    return null;
  }

  setTimeout(() => {
    dispatch(updateErrorState(null));
  }, 3000);

  return (
    <ErrorContainer>
      <ErrorMessage>{error}</ErrorMessage>
    </ErrorContainer>
  );
};

export default Error;
