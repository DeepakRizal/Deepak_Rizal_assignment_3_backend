import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import globalErrorHandler from "./controllers/errorController.js";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// call configDotenv
configDotenv({ path: "./.env" });

//Initialize the app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Data sanitization  against NoSql query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
