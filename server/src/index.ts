require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server Started at PORT ${process.env.PORT} & MongoDB Connected`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
