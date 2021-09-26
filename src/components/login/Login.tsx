import React, { FormEvent, FunctionComponent, useCallback, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import {
  Container,
  Title,
  Background,
  StyledGoogleLogin,
  Input,
  ActionButton,
  SubTextContainer,
  Divider,
  BackToApp,
} from "./style";
import { useAuth } from "hooks/AuthHook";

interface IProps {}

function isGoogleResponse(
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponse {
  return (response as GoogleLoginResponse).accessToken !== undefined;
}

const Login: FunctionComponent<IProps> = () => {
  const { isAuthenticated, login, googleLogin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const handleEmailChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsEmailError(false);

    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsPasswordError(false);
    setPassword(event.currentTarget.value);
  };

  const handleLogin = useCallback(async () => {
    const isEmailEmpty = email.length === 0;
    const isPasswordEmpty = password.length === 0;
    if (isEmailEmpty) {
      setIsEmailError(true);
    }

    if (isPasswordEmpty) {
      setIsPasswordError(true);
    }

    if (isEmailEmpty || isPasswordEmpty) {
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      setIsEmailError(true);
      setIsPasswordError(true);
    }
  }, [email, login, password]);

  const handleGoogleResponse = useCallback(
    async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (isGoogleResponse(response)) {
        try {
          await googleLogin(response.accessToken);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("error google login");
      }
    },
    [googleLogin]
  );

  if (isAuthenticated) {
    return <Redirect to="/pokemons" push />;
  }

  return (
    <Background>
      <Container className="container">
        <Title>Login</Title>
        <Input
          id="filled-basic-email"
          label="Email"
          variant="filled"
          onChange={handleEmailChange}
          error={isEmailError}
          helperText={isEmailError && "Email and password do not match"}
        />
        <Input
          id="filled-basic-password"
          label="Password"
          variant="filled"
          type="password"
          onChange={handlePasswordChange}
          error={isPasswordError}
          helperText={isPasswordError && "Email and password do not match"}
        />
        <ActionButton onClick={handleLogin}>Login</ActionButton>
        <SubTextContainer>
          <span>
            Don't have an account? <Link to="/register">Register here</Link>
          </span>
          <Divider />
        </SubTextContainer>
        {process.env.REACT_APP_GOOGLE_CLIENT_ID && (
          <StyledGoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Google Login"
            onSuccess={handleGoogleResponse}
            cookiePolicy={"single_host_origin"}
          />
        )}
        <BackToApp to="/" component={ActionButton}>
          Back to app
        </BackToApp>
      </Container>
    </Background>
  );
};

export default Login;
