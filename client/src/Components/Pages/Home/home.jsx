import "./home.scss";
import { GoogleLogout } from "react-google-login";
import { GoogleButton } from "react-google-button";
import List from "../../Lists/List.jsx";

export const Home = ({ user, onUserSignin }) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  const logOut = () => {
    onUserSignin(false);
  };

  return (
    <>
      <section className="home">
        {<List user={user} />}
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
          render={(renderProps) => (
            <GoogleButton
              label="Logout"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="logout"
            />
          )}
        />
      </section>
    </>
  );
};
