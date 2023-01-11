import { Request, Response } from "express";
import db from "../../utils/connection";
export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  OWNER: "OWNER",
};
export const PERMISSIONS = {
  ADD_ROLE: "add_role",
  REMOVE_ROLE: "remove_role",
  ADD_PERMISSION: "add_permission",
  REMOVE_PERMISSION: "remove_permission",
  ADD_USER: "add_user",
  REMOVE_USER: "remove_user",
  READ_USER: "read_user",
  ADD_POST: "add_post",
  EDIT_POST: "edit_post",
  REMOVE_POST: "remove_post",
  READ_POST: "read_post",
  ADD_CATEGORY: "add_category",
  REMOVE_CATEGORY: "remove_category",
  EDIT_CATEGORY: "edit_category",
  READ_CATEGORY: "read_category",
};
export const addRole = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (name === null) {
    return res.status(400).json({ message: "name is required" });
  }
  if (!(name in ROLES)) {
    return res.status(400).json({ message: "Provide a valid Role" });
  }
  if (await db.role.findFirst({ where: { name } })) {
    return res.status(400).json({ message: "Role already exists" });
  }
  const role = await db.role.create({ data: { name } });
  return res.status(200).json({ message: "Role created successfully", role });
};

export const addPermission = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (name === null) {
    return res.status(400).json({ message: "name is required" });
  }
  if (!(name in PERMISSIONS)) {
    return res.status(400).json({ message: "Provide a valid Permission" });
  }
  if (await db.permission.findFirst({ where: { name } })) {
    return res.status(400).json({ message: "Permission already exists" });
  }

  const permission = await db.permission.create({ data: { name } });
  return res
    .status(200)
    .json({ message: "Permission created successfully", permission });
};

export const assinRole = async (req: Request, res: Response) => {
  const { id, userId } = req.params;
  const role = await db.role.findFirst({ where: { id } });
  if (!role) {
    return res.status(400).json({ message: "Role does not exist" });
  }
  const user = await db.user.findFirst({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const userRole = await db.userRole.create({
    data: {
      role: {
        connect: { id },
      },
      user: {
        connect: { id: userId },
      },
    },
  });
  return res
    .status(200)
    .json({ message: "Role assigned successfully", userRole });
};

export const assignPermission = async (req: Request, res: Response) => {
  const { id, roleId } = req.params;
  const permission = await db.permission.findFirst({ where: { id } });
  if (!permission) {
    return res.status(400).json({ message: "Permission does not exist" });
  }
  const role = await db.role.findFirst({ where: { id: roleId } });
  if (!role) {
    return res.status(400).json({ message: "Role does not exist" });
  }
  //   Connecting models via RAW string ID can also be achieved via
  //   connecting the connect function in prisma
  const rolePermission = await db.rolePermission.create({
    data: {
      permission: {
        connect: { id },
      },
      role: {
        connect: { id: roleId },
      },
    },
  });
  return res
    .status(200)
    .json({ message: "Permission assigned successfully", rolePermission });
};
