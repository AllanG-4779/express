import express, { Router } from "express";
import { addNewCategory } from "../controller/category/new";
import { updateCategory } from "../controller/category/update";
import { deleteCategory } from "../controller/category/delete";
import { getAllCategories, getCategory } from "../controller/category/get";

const categoryRouter = Router();

//add new category
categoryRouter.post("/new", addNewCategory);

//get all categories
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/:id", getCategory);

categoryRouter.delete("/:id", deleteCategory);
// //update category by id
categoryRouter.patch("/:id", updateCategory);
// get category by id

export default categoryRouter;
