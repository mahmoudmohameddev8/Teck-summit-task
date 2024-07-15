import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
  }
  this.password = bcrypt.hashSync(
    this.password,
    parseInt(process.env.SALT_ROUNDS)
  );
});

export const User = model("User", userSchema);
