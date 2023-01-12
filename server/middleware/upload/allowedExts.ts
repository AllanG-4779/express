import { NextFunction, Response, Request } from "express";
import path from "path";

const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".gif"];

export const allowedExts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req.files is an object
  const files = req.files!;
  const unSupportedExtensions: string[] = [];

  // Get the file names from each of the files
  Object.keys(files).forEach((eachFile) => {
    let extension = path.extname(files[eachFile].name);
    if (!ALLOWED_EXT.includes(extension)) unSupportedExtensions.push(extension);
  });
  if (unSupportedExtensions.length) {
    return res.status(422).json({
      message: `${unSupportedExtensions.toString()} not allowed. Only ${ALLOWED_EXT.toString()} are allowed`,
    });
  }

  next();
};
