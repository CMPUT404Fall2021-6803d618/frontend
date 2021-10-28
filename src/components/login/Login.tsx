import React, { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Title, Background, Input, ActionButton, SubTextContainer, Divider } from "./style";
import { useAuth } from "hooks/AuthHook";

const Login: FunctionComponent = () => {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isUsernameError, setUsernameError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const handleUsernameChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsernameError(false);
    setUsername(event.currentTarget.value);
  }, []);

  const handlePasswordChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsPasswordError(false);
    setPassword(event.currentTarget.value);
  }, []);

  const handleLogin = useCallback(async () => {
    const isUsernameEmpty = username.length === 0;
    const isPasswordEmpty = password.length === 0;
    if (isUsernameEmpty) {
      setUsernameError(true);
    }

    if (isPasswordEmpty) {
      setIsPasswordError(true);
    }

    if (isUsernameEmpty || isPasswordEmpty) {
      return;
    }

    try {
      await login(username, password);
    } catch (err) {
      setUsernameError(true);
      setIsPasswordError(true);
    }
  }, [username, login, password]);

  if (isAuthenticated) {
    return <Redirect to="/home" push />;
  }

  return (
    <Background>
      <Container className="container">
        <Title>Login</Title>
        <Input
          id="filled-basic-usernam"
          label="Username"
          variant="filled"
          onChange={handleUsernameChange}
          error={isUsernameError}
          helperText={isUsernameError && "Username and password do not match"}
        />
        <Input
          id="filled-basic-password"
          label="Password"
          variant="filled"
          type="password"
          onChange={handlePasswordChange}
          error={isPasswordError}
          helperText={isPasswordError && "Username and password do not match"}
        />
        <ActionButton onClick={handleLogin}>Login</ActionButton>
        <SubTextContainer>
          <span>
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </span>
          <Divider />
        </SubTextContainer>
      </Container>
    </Background>
  );
};

export default Login;
