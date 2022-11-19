import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { GoogleLogin } from "react-google-login";
import { GoogleButton } from "react-google-button";
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
      <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        React Todoo's
      </motion.h1>
      <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay: 1}}>
        Welcome! <br />
        sign in with Google to get started!
      </motion.p>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="login"
          />
        )}
      />
    </section>
  );
};

export default Signin;
