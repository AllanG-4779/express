import db from "../../utils/connection";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await db.category.findMany();
  return res.status(200).json({ categories: categories });
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id === null) {
    return res.status(400).json({ message: "ID is required " });
  }
  // get the category from the database
  const category = await db.category.findFirst({
    where: {
      id,
    },
  });
  // check if category exists
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  return res.status(200).json({ category });
};
