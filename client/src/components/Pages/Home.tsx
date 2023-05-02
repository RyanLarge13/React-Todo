import List from "../List";

type props = {
  user: any;
};

const Home = ({ user }: props) => {
  return (
    <section className="flex flex-col items-center justify-center">
      <List user={user} />
    </section>
  );
};

export default Home;
