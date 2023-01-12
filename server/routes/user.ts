import Router from "express";
import fileUpload from "express-fileupload";
import {
  registerUser,
  getUsersPost,
  login,
  logout,
  getUsersPostById,
  updateProfile,
} from "../controller/user/signup";
import {
  alreadyAuthenticated,
  authenticationRequired,
} from "../utils/auth_middleware";
import { filePayloadExists } from "../middleware/upload/fileExists";
import { allowedSize } from "../middleware/upload/allowedSize";
import { allowedExts } from "../middleware/upload/allowedExts";

//initialize router
const userRouter = Router();

//add new user
userRouter.post("/new", authenticationRequired, registerUser);
// get all users
userRouter.get("/my/posts", authenticationRequired, getUsersPost);
// get user's post by ID
userRouter.get("/my/posts/:id", authenticationRequired, getUsersPostById);

userRouter.post(
  "/my/profile",
  authenticationRequired,
  fileUpload({ createParentPath: true }),
  allowedSize,
  allowedExts,
  updateProfile
);
// //update user by id
// router.put("/:id");
// //delete user by id
// router.delete("/:id");
// //login user
userRouter.post("/login", alreadyAuthenticated, login);
// //logout user
userRouter.post("/logout", logout);
export default userRouter;
