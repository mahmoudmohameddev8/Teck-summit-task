import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["text", "list"], required: true },
  body: String,
  items: [String],
  shared: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

export const Task = mongoose.model("Task", taskSchema);
