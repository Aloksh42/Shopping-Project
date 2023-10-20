require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

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
