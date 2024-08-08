import app from "./app.js";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

const db = process.env.MONGODB_URI;

mongoose
  .connect(db)
  .then(() => {
    console.log("connected to db successfully!");
  })
  .catch(() => {
    console.log("failed to connect to db");
  });

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`server has started to port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
