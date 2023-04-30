import { motion } from "framer-motion";

const Nav = ({ user, setUser, setNav }) => {
  const logOut = () => {
    setNav(false);
    setUser(false);
    localStorage.removeItem("token");
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col justify-center items-center"
    >
      <ul>
        <motion.li
          whileHover={{ rotate: [0, 10, -10, 0] }}
          animate={{ scale: [0, 1.1, 1] }}
          className="my-10"
        >
          <a
            href="/"
            className="px-20 py-5 rounded-md shadow-md bg-gradient-to-r from-amber-500 to-rose-400 text-white text-xl"
          >
            Home
          </a>
        </motion.li>
        {user && (
          <motion.li
            whileHover={{ rotate: [0, 10, -10, 0] }}
            animate={{ scale: [0, 1.1, 1] }}
            className="my-10"
          >
            <button
              onClick={() => logOut()}
              className="px-20 py-5 rounded-md shadow-md bg-gradient-to-r from-amber-500 to-rose-400 text-white text-xl"
            >
              Logout
            </button>
          </motion.li>
        )}
      </ul>
    </motion.nav>
  );
};

export default Nav;
