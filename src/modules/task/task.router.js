import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentcation.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as taskController from "./task.controller.js";
import * as taskSchema from "./task.schema.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  validation(taskSchema.createTask),
  taskController.createTask
);
router.patch(
  "/:id",
  isAuthenticated,
  validation(taskSchema.updateTask),
  taskController.updateTask
);
router.delete(
  "/:id",
  isAuthenticated,

  validation(taskSchema.deleteTask),
  taskController.deleteTask

);
router.get("/", taskController.allTasks);
router.get("/", taskController.task);


export default router;
