import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import { items } from "./items";
import { logger } from "./middleware";
import userRouter from "./routes/user.router";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
// body parser for json
app.use(express.json());
app.use(cookieParser());
// initailize session
app.use(
  session({
    secret: "LFJSDLFJDSFLDJFDFLDFDLFJDSVLJDSF",
    saveUninitialized: false,
    resave: false,
  })
);
// body parser for url encoded
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api/v1/users", userRouter);
// Cookie parser is used to parse cookies from the request.headers.cookie

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
