import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category";
import { logger } from "./middleware/logger";
import postRouter from "./routes/posts";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// body parser for json

app.use(logger);
app.use(express.json());
app.use(cookieParser());
// body parser for url encoded
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter);
// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
