import { User } from "@prisma/client";
import { Request, Response } from "express";
import { isBlank, isNull } from "../../utils/validations/duplicate";
import { validNames } from "../../utils/validations/patterns";
import db from "../../utils/connection";
import { hashPassword, passwordMatch } from "../../utils/password";

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
    const user_role = await db.role.findFirst({ where: { name: "USER" } });

    if (!user_role)
      return res
        .status(500)
        .json({ message: "Something went wrong on our end" });
    // Link the role upon signup
    const new_user = await db.user.create({ data: user });

    const linking = await db.userRole.create({
      data: {
        role: {
          connect: {
            id: user_role.id,
          },
        },
        user: {
          connect: {
            id: new_user.id,
          },
        },
      },
    });

    return res.status(201).json({ message: "User created", new_user });
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

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json("Username and Password is required");
  }
  let matches: boolean = false;
  let user: User | null = null;
  try {
    user = await db.user.findFirst({ where: { email: username } });
    matches = await passwordMatch(user!, password);
  } catch (error) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }
  if (matches) {
    // Set the session here
    req.session.user = {
      email: user?.email,
      name: `${user?.firstName} ${user?.lastName}`,
    };
    req.session.authenticated = true;
    return res.status(200).json({ message: "Authentication successfull" });
  } else {
    return res.status(401).json({ message: "Invalid Username and Password" });
  }
};
export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    else return res.status(200).json({ message: "Logout was successful" });
  });
};
