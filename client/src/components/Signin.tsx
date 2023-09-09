import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Axios from "axios";

type props = {
  setToken: Function;
};

const Signin = ({ setToken }: props) => {
  useEffect(() => {
    const query: string = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      Axios.get(`http://localhost:8080/fetch-git-token?code=${codeParam}`)
        .then((res: any) => {
          localStorage.setItem("githubToken", res.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem("token", codeResponse.access_token);
      setToken(codeResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const githubLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_ID
      }`
    );
  };

  const facebookLogin = () => {};

  return (
    <section className="mt-40 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center">SignIn</h1>
      <div className="mt-20 flex flex-col justify-center gap-y-3 items-center w-full">
        <button
          onClick={() => googleLogin()}
          className="w-[50%] p-3 rounded-md shadow-md text-white google"
        >
          Google
        </button>
        <button
          onClick={() => githubLogin()}
          className="w-[50%] p-3 rounded-md shadow-md text-white github"
        >
          Github
        </button>
        <button
          onClick={() => {}}
          className="w-[50%] p-3 rounded-md shadow-md text-white discord"
        >
          Discord
        </button>
        <FacebookLogin
          className="w-[50%] p-3 rounded-md shadow-md text-white facebook"
          children="facebook"
          appId={import.meta.env.VITE_FACEBOOK_APP_ID}
          onSuccess={(response) => {
            console.log("Login Success!", response);
          }}
          onFail={(error) => {
            console.log("Login Failed!", error);
          }}
          onProfileSuccess={(response) => {
            console.log("Get Profile Success!", response);
          }}
        />
        <button
          onClick={() => {}}
          className="w-[50%] p-3 rounded-md shadow-md text-white apple"
        >
          Apple
        </button>
      </div>
    </section>
  );
};

export default Signin;
