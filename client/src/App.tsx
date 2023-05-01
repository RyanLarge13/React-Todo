import React, { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import Axios from "axios";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import Signin from "./components/Signin";

const App = () => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(true);
      Axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!token) {
      setLoading(false);
      console.log("No token");
    }
  }, [token]);

  return (
    <main className="mt-20">
      <Header user={user} setUser={setUser} />
      {loading ? (
        <SyncLoader />
      ) : (
        <section className="mt-20">
          {user ? <Home user={user} /> : <Signin setToken={setToken} />}
        </section>
      )}
    </main>
  );
};

export default App;
