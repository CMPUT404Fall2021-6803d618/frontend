import { ButtonBase, TextField } from "@material-ui/core";
import React from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Title = styled.h1`
  color: white;
  font-family: "Raleway";
  padding: 2rem;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 250%, #f55308 55%, #e1242d 85%);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
`;

export const Input = styled(TextField)`
  width: 275px;
  margin-bottom: 1rem !important;

  .MuiFilledInput-root {
    background-color: rgba(255, 255, 255, 0.1);
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .MuiFilledInput-root.Mui-focused {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .MuiFilledInput-underline {
    &:before {
      border-bottom-color: transparent; //normal
    }
    &:hover:before {
      border-bottom-color: transparent; //hover
    }
    &:after {
      border-bottom-color: rgba(255, 255, 255, 0.6); //focus
    }
  }
  .MuiFormHelperText-root {
    color: #810100 !important;
  }

  .Mui-error {
    color: #810100 !important;
    &:before {
      border-bottom-color: #810100 !important; //normal
    }
    &:hover:before {
      border-bottom-color: #810100 !important; //hover
    }
    &:after {
      border-bottom-color: #810100 !important; //focus
    }
  }

  label {
    color: rgba(255, 255, 255, 0.5);
    &.Mui-focused {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  input {
    color: white;
  }
`;

export const ActionButton = styled(({ navigate, ...props }) => <ButtonBase {...props} />)`
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  padding: 0.75rem !important;
  width: 275px;
  border-radius: 5px !important;
  transition: 100ms all linear !important;
  margin-top: 0.5rem !important;
  &:hover {
    color: white !important;
    background-color: rgba(255, 255, 255, 0.3) !important;
  }
`;

export const SubTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;

  a {
    color: white;
  }
`;

export const Divider = styled.div`
  margin: 1rem 0;
  background-color: rgba(255, 255, 255, 0.7);
  height: 1px;
`;

export const StyledGoogleLogin = styled(GoogleLogin)`
  background-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: none !important;
  width: 275px;
  border-radius: 5px !important;
  transition: 100ms all linear !important;

  div {
    background-color: rgba(255, 255, 255, 0.9) !important;
    margin-right: 0 !important;
    position: absolute;
  }
  span {
    display: flex !important;
    justify-content: center !important;
    color: white !important;
    flex: 1;
    font-size: 1rem !important;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }
`;

export const BackToApp = styled(Link)`
  margin-top: 4rem !important;
`;
