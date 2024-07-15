import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentcation.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as categoryController from "./category.controller.js";
import * as categorySchema from "./category.schema.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  validation(categorySchema.createCategory),
  categoryController.createCategory
);
router.patch(
  "/:id",
  isAuthenticated,
  validation(categorySchema.updateCategory),
  categoryController.updateCategory
);
router.delete(
  "/:id",
  isAuthenticated,
  validation(categorySchema.deleteCategory),
  categoryController.deleteCategory
);
router.get("/", categoryController.allCategories);

export default router;
