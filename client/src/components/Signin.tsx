import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GitHubLogin from "react-github-login";

const Signin = ({ setToken }) => {
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem("token", codeResponse.access_token);
      setToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const responseFacebook = (res) => {
    console.log(res);
  };

  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);

  return (
    <section className="mt-40 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center">SignIn</h1>
      <div className="mt-20 flex flex-col justify-center items-center w-full">
        <button
          onClick={() => googleLogin()}
          className="w-[50%] p-3 rounded-md shadow-md text-white google"
        >
          Google
        </button>
        <FacebookLogin
          appId="950003889525144"
          autoLoad={false}
          callback={responseFacebook}
          field="name,picture"
          scope="public_profile"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="w-[50%] my-10 p-3 rounded-md shadow-md text-white facebook"
            >
              Facebook
            </button>
          )}
        />
        <GitHubLogin
          clientId="Iv1.e582d78f4ad106be"
          onSuccess={onSuccess}
          onFailure={onFailure}
          redirectUri="http://localhost:5173"
          buttonText="Github"
          className="w-[50%] p-3 rounded-md shadow-md text-white github"
        />
      </div>
    </section>
  );
};

export default Signin;
