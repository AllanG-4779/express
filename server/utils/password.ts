import { User } from "@prisma/client";
import { hashSync, genSalt, compareSync } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return hashSync(password, salt);
};
export const passwordMatch = async (user: User, password: string) => {
  return await compareSync(password, user.password!);
};
