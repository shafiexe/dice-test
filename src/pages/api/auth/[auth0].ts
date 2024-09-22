import auth0 from "./_initAuth0";

const getSigninState = (req: any) => {
  return { authorizationParams: { login_hint: req?.query?.login_hint } };
};

const getSignUpState = (req: any) => {
  return {
    authorizationParams: {
      screen_hint: "signup",
      login_hint: req?.query?.login_hint,
    },
  };
};

export default auth0.handleAuth({
  signin: auth0.handleLogin(getSigninState),
  signup: auth0.handleLogin(getSignUpState),
});
