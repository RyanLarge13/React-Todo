import { useState } from "react";
import { motion } from "framer-motion";
import { BiMenuAltRight } from "react-icons/bi";
import Nav from "./Nav";

type props = {
  user: {
    id: string;
  };
  setUser: Function;
};

const Header = ({ user, setUser }: props) => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full p-5 rounded-b-md shadow-md bg-gradient-to-r from-rose-400 to-amber-500 flex justify-between items-center text-white text-4xl z-10">
        <motion.p
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          whileInView={{ scale: 1.1, rotate: [0, 20, 0, 10, 0] }}
        >
          To-Doo's
        </motion.p>
        <BiMenuAltRight onClick={() => setNav((prev) => !prev)} />
      </header>
      {nav && (
        <>
          <Nav user={user} setUser={setUser} setNav={setNav} />
        </>
      )}
    </>
  );
};

export default Header;
