import React from "react"
import List from "../List";
import PropTypes from "prop-types"

Home.propTypes = {
	user: {
		key: any
	}
}

const Home = ({ user }) => {

  return (
    <section className="flex flex-col items-center justify-center">
      <List user={user} />
    </section>
  );
};

export default Home;
