import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category";
import { logger } from "./middleware/logger";
import postRouter from "./routes/posts";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import session, { SessionOptions } from "express-session";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// Session middleware configuration

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    // Should we save the session even if it has not been modified?
    resave: false,
    // Session is uninitialized when it's been created and not modified.
    // Once modified it becomes initialized and is saved to session store
    // Setting it to false will save the session even if the session has not been modified
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
      secure: false,
      sameSite: false,
    },
  })
);

// body parser for url encoded
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
