import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import * as authController from "./auth.controller.js";
import * as authSchema from "./auth.schema.js";

const router = Router();

/////register
router.post(
  "/register",
  validation(authSchema.register),
  authController.register
);

//////login
router.post("/login", validation(authSchema.login), authController.login);

export default router;
