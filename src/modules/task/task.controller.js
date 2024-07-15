import { Task } from "../../../DB/models/task.model.js";
import { asynchandler } from "../../utils/asynchandelrs.js";

export const createTask = asynchandler(async (req, res, next) => {
  const task = new task({ ...req.body, user: req.user._id });

  await task.save();
  return res.json({ sucess: true, message: "task created successfully" });
});

export const allTasks = asynchandler(async (req, res, next) => {
  const match = {};
  if (req.query.shared) {
    match.shared = req.query.shared === "true";
  }

  const tasks = await Task.find(match);
  return res.json({ sucess: true, tasks });
});

export const updateTask = asynchandler(async (req, res, next) => {
  const updates = Object.keys(req.body);

  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) {
    return res.status(404).send();
  }
  updates.forEach((update) => (task[update] = req.body[update]));
  await task.save();
  return res.json({ sucess: true, tasks });
});

export const deleteTask = asynchandler(async (req, res, next) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!task) {
    return res.status(404).send();
  }
  return res.json({ sucess: true, task });
});
///paginiation and sorting
export const task = asynchandler(async (req, res, next) => {
  const match = { user: req.user._id };
  if (req.query.shared) {
    match.shared = req.query.shared === "true";
  }
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const tasks = await Task.find(match)
    .limit(parseInt(req.query.limit))
    .skip(parseInt(req.query.limit) * (parseInt(req.query.page) - 1))
    .sort(sort);
  res.send(tasks);
});

