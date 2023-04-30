import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

export const Todos = mongoose.model("todos", todoSchema);
