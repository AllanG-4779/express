import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category";
import { logger } from "./middleware/logger";

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
// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
