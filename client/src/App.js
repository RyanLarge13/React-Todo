import { useState } from "react";
import { Header } from "./Components/Header/header.jsx";
import { Home } from "./Components/Pages/Home/home.jsx";
import Signin from "./Components/SigninSignup/Signin.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(false);
  return (
    <>
      <Header />
      <section>
        {user ? (
          <Home user={user} onUserSignin={(user) => setUser(user)} />
        ) : (
          <Signin onUserSignin={(user) => setUser(user)} />
        )}
      </section>
    </>
  );
}

export default App;
