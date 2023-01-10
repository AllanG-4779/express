import { Response, Request, NextFunction } from "express";

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user && !req.session.authenticated) {
    return res.status(401).json({ message: "You are not authenticated" });
  } else {
    console.log(req.session.user);
    next();
  }
};
