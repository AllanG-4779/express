import Router from "express";
import {
  registerUser,
  getUsersPost,
  login,
  logout,
  getUsersPostById,
} from "../controller/user/signup";
import {
  alreadyAuthenticated,
  authenticationRequired,
} from "../utils/auth_middleware";

//initialize router
const userRouter = Router();

//add new user
userRouter.post("/new", authenticationRequired, registerUser);
// get all users
userRouter.get("/my/posts", authenticationRequired, getUsersPost);
// get user's post by ID
userRouter.get("/my/posts/:id", authenticationRequired, getUsersPostById);
// //update user by id
// router.put("/:id");
// //delete user by id
// router.delete("/:id");
// //login user
userRouter.post("/login", alreadyAuthenticated, login);
// //logout user
userRouter.post("/logout", logout);
export default userRouter;
