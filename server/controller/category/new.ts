import { Category } from "@prisma/client";
import db from "../../utils/connection";
import { Request, Response } from "express";

export const addNewCategory = async (req: Request, res: Response) => {
  const category: Category = req.body;

  if (category.name !== null) {
    // check if category already exists
    const categoryExists = await db.category.findFirst({
      where: { name: category.name },
    });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
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
