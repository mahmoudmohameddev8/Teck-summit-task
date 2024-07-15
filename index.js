import { connectDB } from "./DB/conncetion.js";
import dotenv from "dotenv";
import express from "express";
const app = express();
import bodyParser from "body-parser";

import authRouter from "./src/modules/auth/auth.router.js";
import categoryRouter from "./src/modules/category/category.router.js";
import taskRouter from "./src/modules/task/task.router.js";

app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/task", taskRouter);

dotenv.config();
await connectDB();
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));
