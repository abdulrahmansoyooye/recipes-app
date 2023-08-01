import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import bodyParser from "body-parser";
import { recipesRouter } from "./routes/recipes.js";
const uri =
  "mongodb+srv://abdulrahmansoyooye:recipe151.com@recipes.ep14i3s.mongodb.net/recipes?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/recipes", recipesRouter);
app.use("/auth", userRouter);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3001, () => {
  console.log("SERVER IS WORKING");
});
