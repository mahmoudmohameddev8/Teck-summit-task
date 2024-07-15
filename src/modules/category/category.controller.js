import { asynchandler } from "../../utils/asynchandelrs.js";
import { Category } from "../../../DB/models/category.model.js";

export const createCategory = asynchandler(async (req, res, next) => {
  //save category in DB
  const category = new Category({ ...req.body, user: req.user._id });
  await Category.create({
    name: req.body.name,
    createdBy: req.user._id,
  });
  return res.json({ sucess: true, message: "category created successfully" });
});
export const allCategories = asynchandler(async (req, res, next) => {
  const categories = await Category.find({ user: req.user._id });
  res.send(categories);
});
export const updateCategory = asynchandler(async (req, res, next) => {
  const updates = Object.keys(req.body);

  const category = await Category.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!category) return next(new Error("category not found", { cause: 404 }));

  updates.forEach((update) => (category[update] = req.body[update]));
  await category.save();
  //return response
  return res.json({ sucess: true, message: "category upated suceesfully" });
});
export const deleteCategory = asynchandler(async (req, res, next) => {
  const category = await Category.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!category) {
    if (!category) return next(new Error("category not found", { cause: 404 }));
  }
  //return res
  return res.json({ sucess: true, message: "category deleted sucessfulyy" });
});
