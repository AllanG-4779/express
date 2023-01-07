import { User } from "@prisma/client";
import { Request, Response } from "express";
import { isBlank, isNull } from "../../utils/validations/duplicate";
import { validNames } from "../../utils/validations/patterns";
import db from "../../utils/connection";
import { hashPassword } from "../../utils/password";

export const registerUser = async (req: Request, res: Response) => {
  // Get the request body object that contains the elements
  const user: User = req.body;
  console.log(user);

  if (
    isNull(user.firstName) ||
    isNull(user.lastName) ||
    isNull(user.email) ||
    isNull(user.password!)
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (
    isBlank(user.firstName) ||
    isBlank(user.lastName) ||
    isBlank(user.email)
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (validNames(user.firstName) || validNames(user.lastName)) {
    return res
      .status(400)
      .json({ message: "Illegal characters found in name" });
  }
  try {
    user.password = await hashPassword(user.password!);
    const userCreation = await db.user.create({ data: user });
    return res.status(201).json({ message: "User created", userCreation });
  } catch (error) {
    console.log(typeof user.firstName);
    console.log(error);
    return res.status(500).json({ message: "Something went wrong on our end" });
  }
};

export const getUsersPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "User ID is required" });

  const posts = await db.post.findMany({ where: { authorId: id } });
  return res.json({ posts });
};
