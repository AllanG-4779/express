// @TO-DO
// 1. Add a route to add new roles;
// 2. Add a route to add new permissions;
// 3. Add a route to

import { Router } from "express";
import {
  addPermission,
  addRole,
  assignPermission,
  assinRole,
} from "../controller/admin";

const adminRouter = Router();

adminRouter.post("/role/add", addRole);
adminRouter.post("/role/:id/:userId", assinRole);
adminRouter.post("/permission/add", addPermission);
adminRouter.post("/permission/:id/:roleId", assignPermission);

export default adminRouter;
