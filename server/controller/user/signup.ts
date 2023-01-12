import { Post, User } from "@prisma/client";
import { Request, Response } from "express";
import { isBlank, isNull } from "../../utils/validations/duplicate";
import { validNames } from "../../utils/validations/patterns";
import db from "../../utils/connection";
import { hashPassword, passwordMatch } from "../../utils/password";
import { FileArray } from "express-fileupload";
import path from "path";

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
  if (!req.session.user?.id)
    return res.status(400).json({ message: "Authentication is required" });

  const posts = await db.post.findMany({
    where: { authorId: req.session.user?.id },
  });
  if (posts?.length === 0)
    return res
      .status(200)
      .json({ message: "You have not created any posts yet" });
  return res.json({ posts });
};

export const getUsersPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Invalid Post ID" });
  else {
    let post: Post | null = null;
    try {
      post = await db.post.findFirst({
        where: { id, authorId: req.session.user?.id },
      });
      if (!post) return res.status(404).json({ message: "Post not found" });
      return res.status(200).json({ post });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong on our end" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // update the login attempts

  if (!username || !password) {
    req.session.failedLoggins = req.session.failedLoggins + 1 || 1;
    return res.status(400).json("Username and Password is required");
  }
  let matches: boolean = false;
  let user: User | null = null;
  try {
    user = await db.user.findFirst({
      where: { email: username },
      include: { roles: true },
    });
    matches = await passwordMatch(user!, password);
  } catch (error) {
    req.session.failedLoggins = req.session.failedLoggins + 1 || 1;
    return res.status(401).json({ message: "Invalid Username or Password" });
  }
  if (matches) {
    // Set the session here
    req.session.user = {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      id: user?.id,
    };
    req.session.authenticated = true;
    return res.status(200).json({ message: "Authentication successfull" });
  } else {
    req.session.failedLoggins = req.session.failedLoggins + 1 || 1;
    return res.status(401).json({ message: "Invalid Username and Password" });
  }
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    else return res.status(200).json({ message: "Logout was successful" });
  });
};
export const updateProfile = async (req: Request, res: Response) => {
  const files: FileArray = req.files!;
  const { bio } = req.body;
  if (isBlank(bio) || isNull(bio)) {
    return res
      .status(400)
      .json({ status: "error", message: "You provided a short bio" });
  }
  // The body is present
  let images = "";

  Object.keys(files).forEach((eachFile) => {
    const filename = files[eachFile].name;
    let imagePath = path.join(
      __dirname,
      "../../../images",
      filename.split(".")[0] +
        req.session.user?.id +
        "." +
        filename.split(".")[1]
    );
    files[eachFile].mv(imagePath, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Something went wrong on our End" });
      console.log("File uploaded successfully to this path", imagePath);
    });
    images = images + ";" + imagePath;
  });
  // Remove the trailing semicolon
  images[0] === ";" ? images.replace(images[0], "") : images;
  // Save the details
  try {
    const profile = await db.profile.create({
      data: {
        bio,
        photo: images,
        userId: req.session.user?.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Profile updated successfully", profile });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong when trying to update your profile",
    });
  }
};
