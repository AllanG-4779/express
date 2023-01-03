import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import { items } from "./items";
import { logger } from "./middleware";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
// body parser for json
app.use(express.json());
// body parser for url encoded
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// formulate your routes

app.get(
  "/",

  (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: "You are wolcomed" });
  }
);
app.post("/print", (req: Request, res: Response) => {
  items.push(req.body);
  return res.status(200).json(items);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
