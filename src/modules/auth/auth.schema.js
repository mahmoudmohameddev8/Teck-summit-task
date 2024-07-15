import Joi from "joi";

export const register = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmpassword: Joi.string().valid(Joi.ref("password")).required(),
}).required();


export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

