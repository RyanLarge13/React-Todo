import List from "../List";

const Home = ({ user }) => {

  return (
    <section className="flex flex-col items-center justify-center">
      <List user={user} />
    </section>
  );
};

export default Home;
