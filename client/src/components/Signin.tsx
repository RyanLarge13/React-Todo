import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Axios from "axios";

type props = {
  setToken: Function;
};

const Signin = ({ setToken }: props) => {
  const DISCORD_API: string = import.meta.env.VITE_DISCORD_API;
  const DISCORD_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
  const CLIENT_ID: string = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const REDIRECT_URI: string = import.meta.env.VITE_DISCORD_REDIRECT_URI;

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

  const handleDiscordLogin = () => {
    console.log("Clicked");
    window.location.href = `${DISCORD_API}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
  };

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (code) {
        try {
          const response = await Axios.post(`${DISCORD_API}/oauth2/token`, {
            client_id: CLIENT_ID,
            client_secret: DISCORD_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: REDIRECT_URI,
          });

          const accessToken = response.data.access_token;

          console.log(accessToken);
        } catch (error) {
          console.error("Error exchanging code for access token:", error);
        }
      }
    };

    handleCallback();
  }, [history]);

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
          onClick={() => handleDiscordLogin()}
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
