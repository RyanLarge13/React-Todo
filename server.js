import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import parser from "body-parser";
import mongoose from "mongoose";
import fetch from "node-fetch";
import { connectDB } from "./config/db.js";
import { Todos } from "./schemas/todoSchema.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5174/",
  "http://localhost:5173",
  "http://localhost:5173/",
  "https://react-todo-production-df51.up.railway.app/",
  "https://react-todo-production-df51.up.railway.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get("/:userId/todos", async (req, res) => {
  const todos = mongoose.connection.collection("todos");
  const data = await todos.find({ userId: req.params.userId }).toArray();
  res.status(200).json({ todos: data });
});

app.post("/:userId/:todo", async (req, res) => {
  const { value, complete, createdAt } = req.body;
  const newTodo = await Todos.create({
    userId: req.params.userId,
    todo: value,
    complete,
    createdAt,
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

//Github login routes ....

app.get("/fetch-git-token", async (req, res) => {
  const code = req.query.code;
  const params = `?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/github-user-data", async (req, res) => {
  req.get("Authorization");
  await fetch(`https://api.github.com/user`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Your app is running on port ${port}`)
);
