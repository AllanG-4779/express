import { Request, Response } from "express";
import db from "../connection";
db;

export const isCorrectLength = (item: string, length: number): Boolean => {
  if(item === undefined) return false
  return item.length > length;
};
export const isBlank = (item: string): Boolean => {
  return item === "";
};
export const isNull = (item: string): Boolean => {
  return item === null || item === undefined;
};
export const exists = async (res: Response, model: string, field: string) => {
  let result = null;
  switch (model) {
    case "category":
      result = await db.category.findFirst({ where: { name: field } });
      break;
    case "profile":
      result = await db.profile.findFirst({ where: { userId: field } });
      break;
    case "role":
      result = await db.role.findFirst({ where: { name: field } });
    case "user":
      result = await db.user.findFirst({ where: { email: field } });
      break;
  }
  return result !== null 
};
