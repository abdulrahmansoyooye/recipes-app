import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import bodyParser from "body-parser";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/recipes", recipesRouter);
app.use("/auth", userRouter);

const uri = process.env.URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("SERVER IS WORKING");
    });
  })
  .catch((err) => {
    console.error(err);
  });
