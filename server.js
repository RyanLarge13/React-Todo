import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import parser from "body-parser";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Todos } from "./schemas/todoSchema.js";

dotenv.config();
connectDB();

const app = express();
const port = 8080;

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get("/:userId/todos", async (req, res) => {
  const todos = mongoose.connection.collection("todos");
  const data = await todos.find({ userId: req.params.userId }).toArray();
  res.status(200).json({ todos: data });
});

app.post("/:userId/:todo", async (req, res) => {
  const todo = req.body.value;
  const newTodo = await Todos.create({
    userId: req.params.userId,
    todo: todo,
  });
  newTodo.save();
  res.status(200).json({ todo: newTodo });
});

app.delete("/delete/:todoId", (req, res) => {
  const id = req.params.todoId;
  Todos.findByIdAndDelete(id, (err, docs) => {
    if (err) console.log(err);
    else res.status(200).json({ message: docs });
  });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Your app is running on port ${port}`)
);
