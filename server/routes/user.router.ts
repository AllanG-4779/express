import { Router, Response, Request } from "express";
import { getUser, getUsers, saveUser } from "../controller/User/user.inc";

const userRouter = Router();

userRouter.post("/add", saveUser);
userRouter.get("", getUser);
userRouter.get("/", getUsers);

export default userRouter;