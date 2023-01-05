import { Request, Response } from "express";
import db from "../../utils/connection";
import { Category } from "@prisma/client";
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newName = req.body.name;
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
  // update the category
  try {
    await db.category.update({ where: { id }, data: { name: newName } });
    return res
      .status(201)
      .json({
        message: `Category name changed from ${category.name} to ${newName}`,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong on our end!" });
  }
};
