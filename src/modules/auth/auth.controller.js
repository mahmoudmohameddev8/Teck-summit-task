import jwt from "jsonwebtoken";
import { User } from "../../../DB/models/user.model.js";
import { asynchandler } from "../../utils/asynchandelrs.js";
import bcryptjs from "bcryptjs";

import { Token } from "../../../DB/models/token.model.js";

export const register = asynchandler(async (req, res, next) => {
  ////data from user
  const { email, username, password } = req.body;
  ////chek user existence
  const user = await User.findOne({ email });
  if (user) return next(new Error("user already existed", { cause: 409 }));

  /////generate token
  const token = jwt.sign({ email }, process.env.TOKEN_SECRET);

  /////create user
  await User.create({ email, username, password });

  ////send response
  return res.json({ sucess: true, message: "you loged in sucessfully " });
});

export const login = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

  ///check user existence
  const user = await User.findOne({ email });
  if (!user) return next(new Error("invalid Email!", { cause: 404 }));

  ///check password
  const match = bcryptjs.compareSync(password, user.password);
  if (!match) return next(new Error("password not match"));
  ///generate token
  const token = jwt.sign({ email, id: user._id }, process.env.TOKEN_SECRET);

  ///save token in model
  await Token.create({ token, user: user._id });
  ///send response
  return res.json({ sucess: true, token });
});
