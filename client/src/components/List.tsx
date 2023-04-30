import { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { SyncLoader } from "react-spinners";
import { Reorder } from "framer-motion";
import AddButtons from "./AddButtons";

const List = ({ user }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/${user.id}/todos`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.todos);
      });
    setLoading(false);
  }, [user.id]);

  const addTodo = async (todo) => {
    setLoading(true);
    const theTodo = {
      value: todo,
      complete: false,
      createdAt: new Date(),
    };
    await fetch(`http://localhost:8080/${user.id}/${todo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems((prev) => [...prev, data.todo]);
      });
    setLoading(false);
  };

  const deleteTodo = async (item) => {
    await fetch(`http://localhost:8080/delete/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });
    const newList = items.filter((i) => i._id !== item._id);
    setItems(newList);
  };

  return (
    <section className="w-full mt-10">
      <AddButtons add={(todo) => addTodo(todo)} />
      <div className="p-5 my-10 rounded-md shadow-md bg-gradient-to-r from-cyan-400 to-blue-300 w-[90%] mx-auto">
        {!loading ? (
          <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.length > 0 ? (
              items.map((item, index) => (
                <Reorder.Item
                  className="p-5 my-5 rounded-md shadow-md bg-white flex justify-between items-center"
                  key={item._id}
                  value={item}
                  whileInView={{ scale: [1.1, 1.1, 0.9, 1] }}
                  whileTap={{ scale: 1.1 }}
                >
                  <p>{index + 1}</p>
                  <p className="mx-5">{item.todo}</p>
                  <AiFillCloseCircle onClick={() => deleteTodo(item)} />
                </Reorder.Item>
              ))
            ) : (
              <p className="text-center text-2xl text-white">Fill Me!!</p>
            )}
          </Reorder.Group>
        ) : (
          <SyncLoader />
        )}
      </div>
    </section>
  );
};

export default List;
