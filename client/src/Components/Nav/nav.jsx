import './nav.scss';
import { motion } from 'framer-motion';

export const Nav = () => {
  return (
    <motion.nav>
      <ul>
        <motion.li
          whileHover={{ rotate: [0, 10, -10, 0] }}
          animate={{ scale: [0, 1.1, 1] }}
        ><a href="/">Home</a></motion.li>
      </ul>
    </motion.nav>
    )
};