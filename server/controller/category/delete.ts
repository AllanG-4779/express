import db from "../../utils/connection";
import { Request, Response } from "express";

export const deleteCategory = async (req: Request, res: Response) => {
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
  // delete the category
  try {
    await db.category.delete({ where: { id } });
    return res.status(201).json({ message: `Category deleted` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong on our end!" });
  }
};
