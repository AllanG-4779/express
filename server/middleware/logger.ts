import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    console.log(
      `${new Date().toLocaleTimeString()} ${req.method} ${req.path} ${res.statusCode} `
    );
  });
  next();
};
