import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import "./signin.scss";

const Signin = ({ onUserSignin }) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = (res) => {
    onUserSignin(res.profileObj);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <section className="signin-section">
      {
        <GoogleLogin
          className="login"
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      }
    </section>
  );
};

export default Signin;
