import Router from "express";
import {
  registerUser,
  getUsersPost,
  login,
  logout,
} from "../controller/user/signup";
import { authenticated } from "../utils/auth";

//initialize router
const userRouter = Router();

//add new user
userRouter.post("/new", registerUser);
// get all users
userRouter.get("/all/:id/posts", authenticated, getUsersPost);
// //get user by id
// router.patch("/:id");
// //update user by id
// router.put("/:id");
// //delete user by id
// router.delete("/:id");
// //login user
userRouter.post("/login", login);
// //logout user
userRouter.get("/logout", logout);
export default userRouter;
