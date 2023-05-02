import { ChangeEvent, SyntheticEvent, useState } from "react";
import { motion } from "framer-motion";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";

type props = {
  add: Function;
};

const AddButtons = ({ add }: props) => {
  const [addToDo, setAddToDo] = useState(false);
  const [input, setInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setInput(value);
  };

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    add(input);
    setInput("");
    setAddToDo(false);
  };

  return (
    <>
      {addToDo && (
        <motion.form
          className=" p-5 fixed bottom-0 left-0 right-0 bg-white rounded-md shadow-md flex flex-col items-center justify-center z-0"
          initial={{ opacity: 0, y: "100%" }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 400 },
          }}
          onSubmit={handleSubmit}
        >
          <motion.input
            onChange={handleChange}
            placeholder="Todo"
            value={input}
            className="mx-auto w-[80%] p-3 rounded-md shadow-md text-center focus:outline-none"
          />
          <motion.button
            type="submit"
            className="px-10 py-2 my-5 mx-20 rounded-md shadow-md text-center bg-gradient-to-r from-pink-300 to-rose-400"
          >
            Add
          </motion.button>
        </motion.form>
      )}
      <motion.div
        className="px-10 py-2 mb-5 mx-20 rounded-md shadow-md flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 to-rose-400"
        onClick={() => setAddToDo((prev) => !prev)}
        whileInView={{ scale: [0, 1.2, 1] }}
        whileTap={{ rotate: [0, 10, -10, 5, -5, 0] }}
      >
        {addToDo ? <AiFillMinusCircle /> : <BsPlusCircleFill />}
        <h2>{addToDo ? "Cancel" : "Add To Doo"} </h2>
      </motion.div>
    </>
  );
};

export default AddButtons;
