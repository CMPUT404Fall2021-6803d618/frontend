import React, { FunctionComponent } from "react";
import styled from "styled-components";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Raleway";
  flex-direction: column;
  height: 70%;
  svg {
    font-size: 10rem;
    margin: 2rem;
    color: #f4ca64;
  }
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
`;

const Body = styled.p`
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
`;

const InDevelopmentView: FunctionComponent = () => {
  return (
    <Container className="container">
      <ErrorOutlineIcon />
      <Header>In Development</Header>
      <Body>Sorry, this page is still in development. It will be available soon!</Body>
    </Container>
  );
};

export default InDevelopmentView;
