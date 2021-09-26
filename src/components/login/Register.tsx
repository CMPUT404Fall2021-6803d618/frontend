import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import { Redirect } from "react-router-dom";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Link } from "react-router-dom";
import {
  ActionButton,
  Background,
  BackToApp,
  Container,
  Divider,
  Input,
  StyledGoogleLogin,
  SubTextContainer,
  Title,
} from "./style";
import { useAuth } from "hooks/AuthHook";

interface IProps {}

function isGoogleResponse(
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponse {
  return (response as GoogleLoginResponse).accessToken !== undefined;
}

const Register: FunctionComponent<IProps> = () => {
  const { isAuthenticated, register, googleLogin } = useAuth();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handleUsernameChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsernameError("");
    setUsername(event.currentTarget.value);
  };

  const handleEmailChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmailError("");
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPasswordError("");
    setPassword(event.currentTarget.value);
  };

  const handleConfirmPasswordChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmPasswordError("");
    setConfirmPassword(event.currentTarget.value);
  };

  const handleRegister = useCallback(async () => {
    const isUsernameEmpty = username.length === 0;
    const isEmailEmpty = email.length === 0;
    const isPasswordEmpty = password.length === 0;
    const isConfirmPasswordEmpty = confirmPassword.length === 0;

    const isPasswordMatched = password === confirmPassword;

    if (isUsernameEmpty) {
      setUsernameError("Username cannot be empty");
    }

    if (isEmailEmpty) {
      setEmailError("Email cannot be empty");
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

    if (
      isEmailEmpty ||
      isPasswordEmpty ||
      isConfirmPasswordEmpty ||
      !isPasswordMatched
    ) {
      return;
    }

    try {
      await register(username, email, password);
      setIsSuccess(true);
    } catch (err) {
      if ((err as any).statusCode === 409) {
        setEmailError("Email already registered");
      }
    }
  }, [username, email, password, confirmPassword, register]);

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
    return <Redirect to="/" />;
  }

  if (isSuccess) {
    return <Redirect to="/login" />;
  }

  return (
    <Background>
      <Container className="container">
        <Title>Register</Title>
        <Input
          id="filled-basic-username"
          label="Username"
          variant="filled"
          onChange={handleUsernameChange}
          error={usernameError.length > 0}
          helperText={usernameError}
        />
        <Input
          id="filled-basic-email"
          label="Email"
          variant="filled"
          onChange={handleEmailChange}
          error={emailError.length > 0}
          helperText={emailError}
        />
        <Input
          id="filled-basic-password"
          label="Password"
          variant="filled"
          type="password"
          onChange={handlePasswordChange}
          error={passwordError.length > 0}
          helperText={passwordError}
        />
        <Input
          id="filled-basic-confirm-password"
          label="Confirm Password"
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

export default Register;
