import React, { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { SyncLoader } from "react-spinners";
import { Reorder } from "framer-motion";
import AddButtons from "../AddButtons/addbuttons.jsx";
import "./list.scss";

const List = ({ user }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/${user.googleId}/todos`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.todos);
      });
    setLoading(false);
  }, [user.googleId]);

  const addTodo = async (todo) => {
    setLoading(true);
    const theTodo = {
      value: todo,
    };
    await fetch(`http://localhost:8080/${user.googleId}/${todo}`, {
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

  return items.length < 1 ? (
    <>
      <h1>Add A Todo!</h1>
      <AddButtons add={(todo) => addTodo(todo)} />
    </>
  ) : (
    <>
      <AddButtons add={(todo) => addTodo(todo)} />
      <div className="to-do-list list-list">
        <h2>Your List!</h2>
        <div className="list-container">
          {!loading ? (
            <Reorder.Group
              className="list"
              axis="y"
              values={items}
              onReorder={setItems}
            >
              <h3>{user.name}</h3>
              {items.map((item, index) => (
                <Reorder.Item
                  className="item"
                  key={item._id}
                  value={item}
                  whileInView={{ scale: [1.1, 1.1, 0.9, 1] }}
                  whileTap={{ scale: 1.1 }}
                >
                  <p>{index + 1}</p>
                  <h1>{item.todo}</h1>
                  <AiFillCloseCircle onClick={() => deleteTodo(item)} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <SyncLoader />
          )}
        </div>
      </div>
    </>
  );
};

export default List;
