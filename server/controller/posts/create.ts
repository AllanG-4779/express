import { Post } from "@prisma/client";
import { Response, Request } from "express";
import {
  isCorrectLength,
  isBlank,
  isNull,
} from "../../utils/validations/duplicate";
import db from "../../utils/connection";
import { resourceLimits } from "worker_threads";
export const createPost = async (req: Request, res: Response) => {
  // Check if there is a post to be made
  const post: Post = req.body;
  const { title, content } = post;
  if (!isCorrectLength(content, 20) || isBlank(content) || isNull(content)) {
    return res.status(400).json({ message: "Content too short is empty" });
  }
  if (!isCorrectLength(title, 10) || isBlank(title) || isNull(title)) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    await db.post.create({ data: post });
    return res.status(201).json({ message: "New post was created" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong on our side" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id === null) {
    return res.status(400).json({ message: "ID is required" });
  }
  // Check if ID exists
  if (!(await db.post.findFirst({ where: { id } }))) {
    return res.status(404).json({ message: "Post not found" });
  }
  try {
    const deletedItem = await db.post.delete({ where: { id } });
    return res.status(202).json({ message: "Post deleted", deletedItem });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!(id === null)) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const item = await db.post.update({ where: { id }, data: body });
    return res.status(200).json({ message: "post deleted successfully", item });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong in our end" });
  }
};

