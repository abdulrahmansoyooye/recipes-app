import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter, verifyToken } from "./routes/users.js";
import bodyParser from "body-parser";
import { recipesRouter } from "./routes/recipes.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import dotenv from "dotenv";
import { RecipeModel } from "./models/Recipes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/recipes", recipesRouter);
app.use("/auth", userRouter);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const uri = process.env.URI;

// file Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/recipes", upload.single("image"), verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

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
