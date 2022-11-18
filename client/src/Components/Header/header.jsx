import './header.scss';
import { Nav } from '../Nav/nav.jsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Header = () => {
  const [nav, setNav] = useState(false);
  const [navToggle, setNavToggle] = useState(true);
  const [x, setX] = useState(false);
  
  return (
    <>
   
        <header>
          
          <motion.p 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: .5, type: 'spring', }}
          whileInView={{ scale: 1.1, rotate: [0, 20, 0, 10, 0] }}
          >To-Doo's</motion.p>
          
          { navToggle && (
          <motion.div className="nav-toggle-body" onClick={() => {setNav(true)
            setNavToggle(false)
            setX(true);
          }}
          initial={{ x: 200 }}
          animate={{ x: 0, y: -25 }}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </motion.div>
          )}
          { x && (
          <motion.div className="nav-toggle-body" onClick={() => {
            setX(false)
            setNavToggle(true)
            setNav(false);
          }}
          initial={{ x: 200 }}
          animate={{ x: 0, y: -25 }}
          >
            <span className="x-1"></span>
            <span className="x-2"></span>
          </motion.div>
          )}
         
        </header>
        
        {
          nav && (
          <>
            <Nav />
          </>
        )}
        
      </>
    );
};