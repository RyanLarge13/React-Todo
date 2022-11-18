import "./home.scss";
import { GoogleLogout } from "react-google-login";
import List from "../../Lists/List.jsx";

export const Home = ({ user, onUserSignin}) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const logOut = () => {
    onUserSignin(false);
  };

  return (
    <>
      <section className="home">
        {<List user={user} />}
        <GoogleLogout
          className="logout"
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
      </section>
    </>
  );
};
