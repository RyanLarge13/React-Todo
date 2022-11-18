import React, { useState } from "react";
import "./addbuttons.scss";
import { motion } from "framer-motion";
import { BsPlusCircleFill } from "react-icons/bs";

const AddButtons = ({ add }) => {
  const [addToDo, setAddToDo] = useState(false);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <>
      {addToDo ? (
        <motion.form
          className="add-the-doo"
          whileInView={{ opacity: 1, scale: [0, 1.1, 1] }}
          onSubmit={() => add(input)}
        >
          <motion.input
            onChange={handleChange}
            placeholder="Todo"
            value={input}
          />
          <motion.button type="submit">Add</motion.button>
        </motion.form>
      ) : (
        <div className="grid-container">
          <motion.div
            className="add-todo add"
            onClick={() => setAddToDo(true)}
            whileInView={{ scale: [0, 1.2, 1] }}
            whileTap={{ rotate: [0, 10, -10, 5, -5, 0] }}
          >
            <BsPlusCircleFill />
            <h2>Add a Too-Doo</h2>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AddButtons;
