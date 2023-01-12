import { NextFunction, Response, Request } from "express";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";

const SIZE = 1024 * 1024 * 5; // 10MB

export const allowedSize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // req.files is an object
  const files = req.files!;
  const overSizeFiles: string[] = [];

  // Get the file names from each of the files
  Object.keys(files).forEach((eachFile) => {
    if (files[eachFile].size > SIZE) {
      overSizeFiles.push(files[eachFile].name);
    }
  });

  if (overSizeFiles.length) {
    return res.status(400).json({
      message: `The files ${overSizeFiles.toString()} ${
        overSizeFiles.length > 1 ? "are" : "is"
      } too large`.replace(",", ", "),
    });
  }

  next();
};
