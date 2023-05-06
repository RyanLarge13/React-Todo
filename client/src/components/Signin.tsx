import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Axios from "axios";

type props = {
  setToken: Function;
};

const Signin = ({ setToken }: props) => {
  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      Axios.get(
        `http://localhost:8080/fetch-git-token?code=${codeParam}`
      )
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
        <button
          onClick={() => githubLogin()}
          className="w-[50%] p-3 rounded-md shadow-md text-white github"
        >
          Github
        </button>
      </div>
    </section>
  );
};

export default Signin;
