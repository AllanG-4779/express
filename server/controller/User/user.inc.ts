import { Request, Response } from "express";
import { UserType } from "../../types/types";
import { User } from "./User";

export const saveUser = (req: Request, res: Response) => {
  console.log(req.cookies);
  const reqBody: UserType = req.body;
  const user = new User();
  const saveUser = user.postUser(reqBody);
  return res.json({ users: saveUser });
};

export const getUsers = (req: Request, res: Response) => {
  const user = new User();
  const userList = user.getUserList();
  return res.json({ userList });
};

export const getUser = (req: Request, res: Response) => {
  res.cookie("user", "visited", {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  console.log(req.cookies);

  const { username } = req.query;
  if (username) {
    const user = new User();
    const userFound = user.getUser(username.toLocaleString());
    if (userFound) {
      return res.json({ userFound });
    }
  }
  return res.status(404).json({ message: "User not found" });
};
