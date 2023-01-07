import { Category } from "@prisma/client";
import db from "../../utils/connection";
import { Request, Response } from "express";
import { exists } from "../../utils/validations/duplicate";

export const addNewCategory = async (req: Request, res: Response) => {
  const category: Category = req.body;

  if (category.name !== null) {
   
    const exist = await exists(res, "category", category.name);
    if (exist) {
      return res.status(400).json({ message: "Category already added" });
    }

    try {
      await db.category.create({ data: category });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong on our end!" });
    }
  } else {
    return res.status(400).json({ message: "Invalid data passed" });
  }
  return res.status(200).json({ message: "Category added successfully" });
};
