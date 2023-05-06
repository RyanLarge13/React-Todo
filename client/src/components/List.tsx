import { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { SyncLoader } from "react-spinners";
import { Reorder } from "framer-motion";
import AddButtons from "./AddButtons";

type props = {
  user: {
    id: string;
  };
};

type todo = {
  _id: string;
  todo: string;
  complete: boolean;
  createdAt: Date;
};

const List = ({ user }: props) => {
  const [items, setItems]: any = useState([]);
  const [loading, setLoading] = useState(true);
  //const productionUrl = "https://react-todo-production-df51.up.railway.app";
  const devUrl = "http://localhost:8080";

  useEffect(() => {
    fetch(`${devUrl}/${user.id}/todos`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.todos);
      });
    setLoading(false);
  }, [user]);

  const addTodo = async (todo: string) => {
    setLoading(true);
    const theTodo = {
      value: todo,
      complete: false,
      createdAt: new Date(),
    };
    await fetch(`${devUrl}/${user.id}/${todo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems((prev: []): [] | any => [...prev, data.todo]);
      });
    setLoading(false);
  };

  const deleteTodo = async (item: todo) => {
    await fetch(`${devUrl}/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });
    const newList = items.filter((i: todo) => i._id !== item._id);
    setItems(newList);
  };

  return (
    <section className="w-full mt-10">
      <AddButtons add={(todo: string) => addTodo(todo)} />
      <div className="p-5 my-10 rounded-md shadow-md bg-gradient-to-r from-cyan-400 to-blue-300 w-[90%] mx-auto">
        {!loading ? (
          <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.length > 0 ? (
              items.map((item: todo, index: number) => (
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
              <p className="text-center text-2xl text-white">{user.id}</p>
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
