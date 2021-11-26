/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, FunctionComponent, useMemo } from "react";
import { Link } from "react-router-dom";
import { paths } from "router/paths";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import ButtonBase from "@mui/material/ButtonBase";
import { useAuth } from "hooks/AuthHook";
import { useAuthStore } from "hooks/AuthStoreHook";
import { extractIdFromUrl } from "utils";
import theme from "theme";
import ListItem from "@mui/material/ListItem";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nunito Sans";
  flex-direction: column;
  svg {
    font-size: 5rem;
    margin: 1rem;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1rem 1rem 1rem;
  width: 100%;
  p {
    margin-bottom: 0;
    color: ${theme.palette.colors.red};
    font-weight: bold;
    text-align: center;
  }
`;

const PrimaryButton = styled(({ navigate, ...props }) => <ButtonBase {...props} />)`
  padding: 0.25rem !important;
  border-radius: 1rem !important;
  transition: 100ms all linear !important;
  margin-top: 0.5rem !important;
  &:hover {
    filter: brightness(140%);
    color: white !important;
  }
`;

const SecondaryButton = styled(({ navigate, ...props }) => <ButtonBase {...props} />)`
  padding: 0.25rem !important;
  border-radius: 1rem !important;
  transition: 100ms all linear !important;
  margin-top: 0.5rem !important;
`;

const UserControl: FunctionComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useAuthStore();
  const LoginLogout = useMemo(
    () =>
      isAuthenticated ? (
        <Fragment>
          <ListItem
            to={`/profile/${extractIdFromUrl(user?.id)}`}
            component={Link}
            sx={{
              justifyContent: "center",
              borderRadius: "20px",
              "&:visited": {
                color: "inherit",
              },
              "&:hover": {
                background: "transparent",
                color: "white",
              },
            }}
          >
            Profile
          </ListItem>
          <SecondaryButton onClick={logout}>Logout</SecondaryButton>
        </Fragment>
      ) : (
        <Fragment>
          <Link to={paths.LOGIN} component={PrimaryButton}>
            Login
          </Link>
          <Link to={paths.REGISTER} component={SecondaryButton}>
            Register
          </Link>
        </Fragment>
      ),
    [isAuthenticated, logout, user?.id]
  );

  return (
    <Header>
      <AccountCircleIcon />
      <Control>
        {user ? <p>{user.displayName}</p> : <p>Social Distance </p>}
        {LoginLogout}
      </Control>
    </Header>
  );
};

export default UserControl;
