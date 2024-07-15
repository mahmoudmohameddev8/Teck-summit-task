import Joi from "joi";
import { isValidObjectID } from "../../middleware/validation.middleware.js";

export const createTask = Joi.object({
  name: Joi.string().min(5).max(20).required(),
}).required();

export const updateTask = Joi.object({
  name: Joi.string().min(5).max(20),
  id: Joi.string().custom(isValidObjectID).required(),
}).required();

export const deleteTask = Joi.object({
  id: Joi.string().custom(isValidObjectID).required(),
}).required();
