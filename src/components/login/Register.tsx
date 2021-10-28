import React, { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { ActionButton, Background, Container, Divider, Input, SubTextContainer, Title } from "./style";
import { useAuth } from "hooks/AuthHook";
import { ServiceError } from "utils/ServiceError";

const Register: FunctionComponent = () => {
  const { isAuthenticated, register } = useAuth();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [githubUrlError, setGithubUrlError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handleUsernameChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsernameError("");
    setUsername(event.currentTarget.value);
  }, []);

  const handleGithubUrlChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGithubUrlError("");
    setGithubUrl(event.currentTarget.value);
  }, []);

  const handleDisplayNameChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDisplayName(event.currentTarget.value);
  }, []);

  const handlePasswordChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPasswordError("");
    setPassword(event.currentTarget.value);
  }, []);

  const handleConfirmPasswordChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConfirmPasswordError("");
    setConfirmPassword(event.currentTarget.value);
  }, []);

  const handleRegister = useCallback(async () => {
    const isUsernameEmpty = username.length === 0;
    const isPasswordEmpty = password.length === 0;
    const isConfirmPasswordEmpty = confirmPassword.length === 0;

    const isPasswordMatched = password === confirmPassword;

    if (isUsernameEmpty) {
      setUsernameError("Username cannot be empty");
    }

    if (isPasswordEmpty) {
      setPasswordError("Password cannot be empty");
    }

    if (isConfirmPasswordEmpty) {
      setConfirmPasswordError("Confirm password cannot be empty");
    }

    if (!isPasswordMatched) {
      setConfirmPasswordError("Confirm password does not match password");
    }

    if (isPasswordEmpty || isConfirmPasswordEmpty || !isPasswordMatched) {
      return;
    }

    try {
      await register({ username, password, displayName, githubUrl });
      setIsSuccess(true);
    } catch (err) {
      if ((err as ServiceError).statusCode === 409) {
        setGithubUrlError("Username already registered");
      }
    }
  }, [username, password, confirmPassword, register, displayName, githubUrl]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (isSuccess) {
    return <Redirect to="/home" />;
  }

  return (
    <Background>
      <Container className="container">
        <Title>Register</Title>
        <Input
          id="filled-basic-username"
          label="Username *"
          variant="filled"
          onChange={handleUsernameChange}
          error={usernameError.length > 0}
          helperText={usernameError}
        />
        <Input
          id="filled-basic-display-name"
          label="Display Name"
          variant="filled"
          onChange={handleDisplayNameChange}
        />
        <Input
          id="filled-basic-github-url"
          label="Github Url"
          variant="filled"
          onChange={handleGithubUrlChange}
          error={githubUrlError.length > 0}
          helperText={githubUrlError}
        />
        <Input
          id="filled-basic-password"
          label="Password *"
          variant="filled"
          type="password"
          onChange={handlePasswordChange}
          error={passwordError.length > 0}
          helperText={passwordError}
        />
        <Input
          id="filled-basic-confirm-password"
          label="Confirm Password *"
          variant="filled"
          type="password"
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError.length > 0}
          helperText={confirmPasswordError}
        />
        <ActionButton onClick={handleRegister}>Register</ActionButton>
        <SubTextContainer>
          <span>
            Already have an account? <Link to="/login">Log in here</Link>
          </span>
          <Divider />
        </SubTextContainer>
      </Container>
    </Background>
  );
};

export default Register;
