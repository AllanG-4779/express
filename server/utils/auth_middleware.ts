import { Response, Request, NextFunction } from "express";
import db from "./connection";
import { ROLES } from "../controller/admin";
import { Post } from "@prisma/client";

export const authenticationRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user && !req.session.authenticated) {
    return res.status(401).json({ message: "You are not authenticated" });
  } else {
    console.log(req.session.user);
    next();
  }
};

// Is the user already logged in

export const alreadyAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user && req.session.authenticated) {
    return res.status(200).json({ message: "You are already logged in" });
  } else {
    next();
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the session
  if (!req.session.user || !req.session.authenticated)
    return res.status(401).json({ message: "You are not authenticated" });

  const email = req.session.user?.email;
  const user = await db.user.findFirst({
    where: { email },
    include: { roles: true },
  });
  const roles = await Promise.all(
    user?.roles.map((each) =>
      db.role.findFirst({ where: { id: each.roleId } })
    )!
  );
  // Check if admin exists
  console.log(roles.toLocaleString());
  const admin = roles.filter((each) => {
    return each?.name === ROLES.ADMIN;
  });
  if (admin.length === 0)
    return res
      .status(403)
      .json({ message: "You are unauthorized to access this route" });
  else next();
};

export const isAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!req.session.user || !req.session.authenticated || !id) {
    return res.status(401).json({ message: "Authentication is required" });
  } else {
    let post: Post | null = null;
    try {
      post = await db.post.findFirst({ where: { id } });
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (!(post.authorId === req.session.user.id))
        return res
          .status(403)
          .json({ message: "You are not the author for this post" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  next();
};
