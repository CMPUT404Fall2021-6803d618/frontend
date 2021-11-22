import CircularProgress from "@mui/material/CircularProgress";
import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Loading: FC = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Loading;
