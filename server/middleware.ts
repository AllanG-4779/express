import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const time = new Date().toLocaleTimeString().split(" ")[0];

  res.on("finish", () => {
    console.log(time, req.method, req.path, res.statusCode);
  });
  next();
};
